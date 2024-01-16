const LoadScript = (callback: () => void) => {
  const existingScript = document.getElementById("googleAdSense");
  if (!existingScript) {
    const script = document.createElement("script");
    var meta = document.createElement("meta");
    meta.name = "google-adsense-platform-account";
    meta.content = "ca-host-pub-1203149545224208";
    document.getElementsByTagName("head")[0].appendChild(meta);

    script.src = `https://securepubads.g.doubleclick.net/tag/js/gpt.js`;
    script.id = "googleAdSense";
    script.setAttribute("data-ad-frequency-hint", "30s");
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default LoadScript;
