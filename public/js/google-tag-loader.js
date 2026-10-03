(() => {
  const containerId = 'GTM-PV4Q6NG9';
  const interactionEvents = ['scroll', 'touchstart', 'pointerdown', 'keydown'];
  let loaded = false;
  let idleCallbackId;

  const gclid = new URLSearchParams(window.location.search).get('gclid');
  if (gclid) {
    try {
      window.localStorage.setItem('gclid', gclid);
    } catch {}
    document.cookie = `gclid=${encodeURIComponent(gclid)}; Max-Age=7776000; Path=/; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
  }

  const removeTriggers = () => {
    window.removeEventListener('load', onLoad);
    interactionEvents.forEach((eventName) => window.removeEventListener(eventName, onInteraction));
  };

  const injectGtm = () => {
    if (loaded) return;
    loaded = true;
    removeTriggers();
    if (idleCallbackId !== undefined && 'cancelIdleCallback' in window) {
      window.cancelIdleCallback(idleCallbackId);
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
    document.head.appendChild(script);
  };

  const onLoad = () => {
    if ('requestIdleCallback' in window) {
      idleCallbackId = window.requestIdleCallback(injectGtm, { timeout: 5000 });
    } else {
      window.setTimeout(injectGtm, 0);
    }
  };

  const onInteraction = () => injectGtm();

  interactionEvents.forEach((eventName) => {
    window.addEventListener(eventName, onInteraction, { once: true, passive: true });
  });
  window.addEventListener('load', onLoad, { once: true });
  if (document.readyState === 'complete') onLoad();
})();
