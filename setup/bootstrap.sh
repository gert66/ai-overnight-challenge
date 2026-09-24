#!/usr/bin/env bash
# AI Challenge minimum bootstrap.
# Goal: do only enough manual setup to hand the machine to ChatGPT through
# Remote Desktop Commander. The full AI Orchestrator install happens AFTER
# the handoff.
set -euo pipefail

BOOTSTRAP_VERSION="1.0.0"
TARGET_USER="orchestrator"
TARGET_HOME="/home/$TARGET_USER"
SOURCE_REPO="gert66/ai-overnight-challenge"
SOURCE_REF="${AI_CHALLENGE_SOURCE_REF:-main}"
SOURCE_BASE="https://raw.githubusercontent.com/${SOURCE_REPO}/${SOURCE_REF}/setup"
SUDO_FILE="/etc/sudoers.d/ai-challenge-bootstrap"
REMOTE_SESSION="ai-challenge-dc"

say(){ printf '\n==> %s\n' "$*"; }
fail(){ printf 'BOOTSTRAP FAIL: %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || fail "Run this bootstrap as root."

if [ ! -r /etc/os-release ]; then fail "/etc/os-release is missing."; fi
. /etc/os-release
[ "${ID:-}" = "ubuntu" ] || fail "This bootstrap supports Ubuntu only (found: ${ID:-unknown})."

case "${VERSION_ID:-}" in
  22.04|24.04|26.04) ;;
  *) printf 'WARNING: Ubuntu %s has not been clean-room validated yet. Continuing with standard checks.\n' "${VERSION_ID:-unknown}" ;;
esac

say "Minimum system packages"
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y curl ca-certificates jq sudo tmux openssh-client python3

say "Load central bootstrap manifest"
TMP_MANIFEST="/tmp/ai-challenge-manifest.json"
curl -fsSL "$SOURCE_BASE/manifest.json" -o "$TMP_MANIFEST"
BOOTSTRAP_VERSION="$(jq -er '.bootstrap_version' "$TMP_MANIFEST")" || fail "Manifest has no bootstrap_version."
DC_PACKAGE="$(jq -er '.desktop_commander.package' "$TMP_MANIFEST")" || fail "Manifest has no desktop_commander.package."
[ -n "$DC_PACKAGE" ] || fail "Desktop Commander package in manifest is empty."

say "Dedicated orchestrator user"
if ! id "$TARGET_USER" >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash "$TARGET_USER"
fi
install -d -m 0700 -o "$TARGET_USER" -g "$TARGET_USER" "$TARGET_HOME/.ssh"

# Preserve the SSH access that already worked for the human. This makes the
# orchestrator account reachable without asking the participant to create a
# second key manually.
if [ -s /root/.ssh/authorized_keys ]; then
  install -m 0600 -o "$TARGET_USER" -g "$TARGET_USER" /root/.ssh/authorized_keys "$TARGET_HOME/.ssh/authorized_keys"
fi

say "Temporary bootstrap sudo"
cat >"$SUDO_FILE" <<EOF
# Temporary AI Challenge bootstrap permission.
# Removed by ChatGPT before final acceptance.
$TARGET_USER ALL=(ALL) NOPASSWD: ALL
EOF
chmod 0440 "$SUDO_FILE"
visudo -cf "$SUDO_FILE" >/dev/null

say "Node.js for Remote Desktop Commander"
runuser -u "$TARGET_USER" -- env HOME="$TARGET_HOME" DC_PACKAGE="$DC_PACKAGE" bash -lc '
  set -e
  export NVM_DIR="$HOME/.nvm"
  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  fi
  . "$NVM_DIR/nvm.sh"
  nvm install --lts >/dev/null
  nvm alias default "lts/*" >/dev/null
  node --version
  npm --version
  mkdir -p "$HOME/.npm-global"
  npm config set prefix "$HOME/.npm-global"
  npm install -g "$DC_PACKAGE"
  "$HOME/.npm-global/bin/desktop-commander" --version || true
'

say "AI Challenge handoff files"
install -m 0644 "$TMP_MANIFEST" "$TARGET_HOME/AI_CHALLENGE_MANIFEST.json"
curl -fsSL "$SOURCE_BASE/AI_CHALLENGE_CONTEXT.md" -o "$TARGET_HOME/AI_CHALLENGE_CONTEXT.md"
curl -fsSL "$SOURCE_BASE/status.schema.json" -o "$TARGET_HOME/AI_CHALLENGE_STATUS.schema.json"
chown "$TARGET_USER:$TARGET_USER"   "$TARGET_HOME/AI_CHALLENGE_MANIFEST.json"   "$TARGET_HOME/AI_CHALLENGE_CONTEXT.md"   "$TARGET_HOME/AI_CHALLENGE_STATUS.schema.json"
chmod 0644 "$TARGET_HOME/AI_CHALLENGE_MANIFEST.json" "$TARGET_HOME/AI_CHALLENGE_CONTEXT.md" "$TARGET_HOME/AI_CHALLENGE_STATUS.schema.json"

HOSTNAME_VALUE="$(hostname)"
OS_VALUE="${PRETTY_NAME:-Ubuntu}"
python3 - "$TARGET_HOME/AI_CHALLENGE_STATUS.json" "$BOOTSTRAP_VERSION" "$HOSTNAME_VALUE" "$OS_VALUE" <<'PY'
import json, sys
from datetime import datetime, timezone
path, version, hostname, os_name = sys.argv[1:5]
data = {
    "schema_version": 1,
    "bootstrap_version": version,
    "hostname": hostname,
    "os": os_name,
    "phase": "HANDOFF_READY",
    "handoff_ready": True,
    "desktop_commander": {
        "installed": True,
        "verified": False,
        "last_verified": None
    },
    "github": "pending",
    "claude": "pending",
    "codex": "pending",
    "orchestrator": {
        "installed": False,
        "diagnose": "not_run",
        "post_reboot_acceptance": "not_run",
        "real_job_acceptance": "not_run"
    },
    "temporary_bootstrap_sudo": True,
    "last_error": None,
    "updated_at": datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
}
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, sort_keys=True)
    f.write("\n")
PY
chown "$TARGET_USER:$TARGET_USER" "$TARGET_HOME/AI_CHALLENGE_STATUS.json"
chmod 0644 "$TARGET_HOME/AI_CHALLENGE_STATUS.json"

say "Remote Desktop Commander helper"
cat >/usr/local/bin/ai-challenge-remote <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
TARGET_USER=orchestrator
TARGET_HOME=/home/orchestrator
SESSION=ai-challenge-dc

if [ "$(id -un)" != "$TARGET_USER" ]; then
  exec sudo -u "$TARGET_USER" -H /usr/local/bin/ai-challenge-remote "$@"
fi

export HOME="$TARGET_HOME"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] || { echo "NVM is missing at $NVM_DIR" >&2; exit 1; }
# shellcheck disable=SC1090
. "$NVM_DIR/nvm.sh"

case "${1:-start}" in
  start)
    if ! tmux has-session -t "$SESSION" 2>/dev/null; then
      tmux new-session -d -s "$SESSION" "exec '$HOME/.npm-global/bin/desktop-commander' remote 2>&1 | tee -a '$HOME/desktop-commander-remote.log'"
    fi
    echo "Remote Desktop Commander is running in tmux session '$SESSION'."
    echo "The next screen shows the pairing/login output. Complete the browser authorization."
    echo "Detach with Ctrl+B, then D. Do not stop the process."
    sleep 1
    exec tmux attach-session -t "$SESSION"
    ;;
  status)
    if tmux has-session -t "$SESSION" 2>/dev/null; then
      echo "RUNNING"
      tmux capture-pane -pt "$SESSION" -S -40 || true
    else
      echo "STOPPED"
      exit 1
    fi
    ;;
  logs)
    exec tail -n 100 "$HOME/desktop-commander-remote.log"
    ;;
  stop)
    tmux kill-session -t "$SESSION" 2>/dev/null || true
    echo "STOPPED"
    ;;
  *)
    echo "Usage: ai-challenge-remote [start|status|logs|stop]" >&2
    exit 2
    ;;
esac
EOF
chmod 0755 /usr/local/bin/ai-challenge-remote

say "Bootstrap diagnostics"
node_version="$(runuser -u "$TARGET_USER" -- env HOME="$TARGET_HOME" bash -lc 'export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; node --version')" || fail "Node did not start for orchestrator."
node_major="${node_version#v}"; node_major="${node_major%%.*}"
[ "$node_major" -ge 18 ] || fail "Node 18+ is required; found $node_version."
[ -f "$TARGET_HOME/AI_CHALLENGE_CONTEXT.md" ] || fail "Context file missing."
[ -f "$TARGET_HOME/AI_CHALLENGE_STATUS.json" ] || fail "Status file missing."
visudo -cf "$SUDO_FILE" >/dev/null || fail "Temporary sudo file is invalid."

cat <<EOF

AI CHALLENGE BOOTSTRAP READY

Human bootstrap is almost finished.

1. Start Remote Desktop Commander:
   ai-challenge-remote

2. Complete the browser pairing shown in that session.
   Leave the tmux session running. Detach with Ctrl+B, then D.

3. In ChatGPT, connect the Remote Desktop Commander MCP connector:
   https://mcp.desktopcommander.app/mcp

4. Start a new chat and send:

   I have completed the AI Challenge bootstrap. Connect to my server through
   Desktop Commander. Read ~/AI_CHALLENGE_CONTEXT.md,
   ~/AI_CHALLENGE_STATUS.json and ~/AI_CHALLENGE_MANIFEST.json. Continue the
   installation from there. Do as much as possible yourself. Ask me only when
   you need an authorization, password, browser login, payment action or
   another action I must personally approve.

Important: "online" is not the acceptance test. ChatGPT must execute a real
command such as hostname and read the context file before taking over.

EOF
