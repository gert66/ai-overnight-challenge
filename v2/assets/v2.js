// AI Overnight Challenge — V2 shared script. Vanilla JS only, no network calls.
// Jargon disclosures already work without JS via native <details>/<summary>;
// this only adds small non-essential polish.
(function () {
  "use strict";

  // Jargon toggles: close other open jargon disclosures when a new one
  // opens, so the page does not fill up with open definitions on mobile.
  var jargonEls = document.querySelectorAll("details.jargon");
  jargonEls.forEach(function (el) {
    el.addEventListener("toggle", function () {
      if (!el.open) return;
      jargonEls.forEach(function (other) {
        if (other !== el) other.open = false;
      });
    });
  });
})();
