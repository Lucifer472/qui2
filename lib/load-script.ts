const LoadScript = (callback: () => void) => {
  const existingScript = document.getElementById("googleAdSense");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://securepubads.g.doubleclick.net/tag/js/gpt.js`;
    script.id = "googleAdSense";
    script.async = true;
    document.head.appendChild(script);
    addEventListener("DOMContentLoaded", () => {
      script.onload = () => {
        if (callback) callback();
      };
    });
  }
  if (existingScript && callback) callback();
};
export default LoadScript;
