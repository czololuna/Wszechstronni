fetch("https://TWOJ-TUNEL/log", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    url: window.location.href
  })
});