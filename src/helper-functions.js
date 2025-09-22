export function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}
export function detectBrowser(userAgent) {
  const browsers = [
    { name: "Chrome", regex: /Chrome/ },
    { name: "Firefox", regex: /Firefox/ },
    { name: "Safari", regex: /Safari/ },
    { name: "Edge", regex: /Edge/ },
  ];
  for (const browser of browsers) {
    if (browser.regex.test(userAgent)) {
      return browser.name;
    }
  }
  return "Unknown";
}
export function detectEnvironment() {
   const ua = navigator.userAgent || navigator.vendor || window.opera;
   const isIOS = /iPhone|iPad|iPod/.test(ua);
   const isAndroid = /Android/.test(ua);
   // Detect WebView
   const isIOSWebView = isIOS && !ua.includes("Safari");
   const isAndroidWebView = isAndroid && (ua.includes("; wv") || /\bVersion\//.test(ua));
   if (isIOSWebView || isAndroidWebView) {
     return "webview";
   }
   return "browser"; // default fallback
}