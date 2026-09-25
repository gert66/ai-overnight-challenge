(function () {
  'use strict';
  if (location.hostname !== 'gert66.github.io') return;

  const MEASUREMENT_ID = 'G-0QHTLLY72Z';
  const CONSENT_KEY = 'ai_challenge_analytics_consent';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ dataLayer.push(arguments); };

  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  gtag('set', 'allow_google_signals', false);
  gtag('set', 'allow_ad_personalization_signals', false);
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    send_page_view: true,
    transport_type: 'beacon'
  });

  const ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(ga);

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    gtag('consent', 'update', { analytics_storage: value === 'granted' ? 'granted' : 'denied' });
    const banner = document.getElementById('ai-analytics-consent');
    if (banner) banner.remove();
  }

  const saved = localStorage.getItem(CONSENT_KEY);
  if (saved === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  if (saved === 'denied') return;

  function showBanner() {
    if (document.getElementById('ai-analytics-consent')) return;
    const style = document.createElement('style');
    style.textContent = '#ai-analytics-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:760px;margin:auto;padding:14px 16px;border:1px solid #30363d;border-radius:12px;background:#0d1117;color:#e6edf3;box-shadow:0 10px 35px rgba(0,0,0,.35);font:14px/1.45 system-ui,sans-serif}#ai-analytics-consent strong{display:block;margin-bottom:4px}#ai-analytics-consent .actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}#ai-analytics-consent button{border:1px solid #58a6ff;border-radius:8px;padding:7px 11px;cursor:pointer;font-weight:700}#ai-analytics-consent .accept{background:#58a6ff;color:#07111f}#ai-analytics-consent .decline{background:transparent;color:#e6edf3}';
    document.head.appendChild(style);
    const box = document.createElement('div');
    box.id = 'ai-analytics-consent';
    box.innerHTML = '<strong>Privacyvriendelijke analytics</strong><span>We gebruiken Google Analytics om te zien welke pagina’s worden bezocht en de AI Challenge te verbeteren. Advertentietracking staat uit.</span><div class="actions"><button class="accept" type="button">Analytics toestaan</button><button class="decline" type="button">Nee bedankt</button></div>';
    box.querySelector('.accept').addEventListener('click', function(){ setConsent('granted'); });
    box.querySelector('.decline').addEventListener('click', function(){ setConsent('denied'); });
    document.body.appendChild(box);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner);
  else showBanner();
})();
