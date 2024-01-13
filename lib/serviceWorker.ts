const LoadServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
        function (registration) {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        },
        function (err) {
          console.error("Service Worker registration failed:", err);
        }
      );
    });
    return true;
  }
  console.warn("Service Worker not supported in this browser.");
  return false;
};

export default LoadServiceWorker;
