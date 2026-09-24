# AI Challenge machine context

## What this machine is

This is a dedicated Ubuntu machine for an AI Challenge participant.

The human has completed only the minimum bootstrap required to let ChatGPT reach the machine through Remote Desktop Commander. From this point onward, ChatGPT should perform as much of the technical installation, configuration, testing, recovery and maintenance as possible.

Do not turn the remaining setup into a Linux tutorial. Inspect the machine and act directly.

## First actions in every new ChatGPT session

1. Confirm that Remote Desktop Commander can execute a real command on this machine. Do not rely only on an "online" status.
2. Run `hostname`, `whoami`, and `uname -a`.
3. Read:
   - `~/AI_CHALLENGE_CONTEXT.md`
   - `~/AI_CHALLENGE_STATUS.json`
   - `~/AI_CHALLENGE_MANIFEST.json`
4. Inspect the real machine state before trusting the status file.
5. Continue from the first incomplete step.

## Objective

Build a safe, reusable AI software workspace with:

- Linux user: `orchestrator`
- Remote Desktop Commander
- Git and GitHub CLI
- Claude Code
- OpenAI Codex CLI
- AI Orchestrator Starter
- systemd job service
- health timer
- watchdog timer
- diagnostics
- reboot recovery
- acceptance evidence

## Canonical source

Read `~/AI_CHALLENGE_MANIFEST.json`.

The manifest is authoritative for:

- bootstrap version
- canonical AI Orchestrator Starter repository
- canonical ref/version
- default provider profile
- Remote Desktop Commander package

Do not hardcode a different branch or version unless the human explicitly asks for it.

## Default model routing

The canonical default profile is `claude`:

- Brain / Planner: Claude Sonnet
- Worker: Claude Sonnet by default
- Reviewer: Claude Opus

A job may explicitly override the Worker provider when appropriate.

## Directory conventions

- Orchestrator install: `/opt/ai-orchestrator`
- Participant repositories: `/home/orchestrator/repos`
- Orchestrator config/secrets: `/home/orchestrator/.config/ai-orchestrator`
- Install stamp: `/var/lib/ai-orchestrator/install-stamp.json`
- Bootstrap context: `/home/orchestrator/AI_CHALLENGE_CONTEXT.md`
- Bootstrap status: `/home/orchestrator/AI_CHALLENGE_STATUS.json`
- Bootstrap manifest: `/home/orchestrator/AI_CHALLENGE_MANIFEST.json`

## What ChatGPT should do autonomously

After Remote Desktop Commander is proven with a real command, ChatGPT may:

- inspect the machine;
- install and update non-secret software required by this project;
- configure Git;
- install GitHub CLI;
- initiate GitHub authentication;
- clone the canonical Orchestrator Starter after GitHub access is authorized;
- verify the canonical ref;
- install Claude Code and Codex;
- initiate their interactive login flows;
- install and configure the AI Orchestrator;
- configure systemd, health monitoring and watchdogs;
- run tests and diagnostics;
- update `AI_CHALLENGE_STATUS.json`;
- reboot the machine when needed for acceptance testing;
- perform post-reboot recovery checks;
- run a controlled acceptance job;
- create documentation and evidence;
- remove the temporary bootstrap sudo rule when installation is complete.

Use the existing installer, diagnostics and acceptance tooling in the canonical Orchestrator Starter wherever possible. Do not rebuild functionality that already exists there.

## Actions that still require the human

Bring the human back only for genuine authorization boundaries, including:

- passwords;
- OAuth/browser approval;
- 2FA;
- payment/account actions;
- entering secrets or API keys;
- destructive cloud-provider actions such as deleting or rebuilding the server;
- any other explicit external authorization that ChatGPT cannot perform.

Never ask the human to manually run routine Linux commands if Remote Desktop Commander can perform them.

## Git safety

Before changing a repository:

- identify the repository and branch;
- inspect current branch/state;
- inspect relevant files;
- keep changes reviewable;
- never put secrets in Git;
- never merge to a production branch without explicit permission.

For Orchestrator Starter work, use the canonical ref from the manifest. Do not merge to `main` without explicit permission.

## Generic AI Challenge only

This machine setup must stay generic.

Do not install or copy:

- mYngle repositories;
- mYngle secrets;
- Nextcloud/SURFdrive configuration;
- Sales Cockpit jobs;
- company enrichment;
- internal mYngle pollers;
- any other private mYngle infrastructure.

## Bootstrap sudo

During bootstrap, `orchestrator` may temporarily have passwordless sudo so ChatGPT can finish the machine setup without repeatedly involving the human.

This is temporary.

Before final acceptance, remove:

`/etc/sudoers.d/ai-challenge-bootstrap`

Then validate sudoers and confirm the normal Orchestrator Starter's restricted permissions still work.

## Definition of done

The machine is ready only when all of these are proven:

1. Remote Desktop Commander can execute a real command.
2. GitHub authentication works as the `orchestrator` user.
3. Claude Code is installed and authenticated.
4. Codex is installed and authenticated.
5. The canonical AI Orchestrator Starter is installed.
6. Diagnostics pass.
7. Health and watchdog timers are enabled and active.
8. The machine survives a reboot.
9. Post-reboot diagnostics/acceptance pass.
10. Remote Desktop Commander is re-tested after reboot. If upstream authentication requires a fresh browser authorization, ask the human only for that authorization.
11. A controlled real Orchestrator job reaches DONE and, when configured, pushes its job branch.
12. Acceptance evidence is written.
13. The temporary bootstrap sudo rule is removed.
14. `AI_CHALLENGE_STATUS.json` reports `READY`.

Only then tell the participant:

**Your AI workspace is ready.**
