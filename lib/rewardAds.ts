window.googletag = window.googletag || { cmd: [] };

export const getrewardad = (isHome: true) => {
  googletag.cmd.push(() => {
    const rewardedSlot = googletag.defineOutOfPageSlot(
      "/22850953890/FT_REWARDED",
      googletag.enums.OutOfPageFormat.REWARDED
    );
    if (rewardedSlot === null) return null;
    rewardedSlot.addService(googletag.pubads());
    googletag.enableServices();
    googletag.pubads().addEventListener("rewardedSlotReady", function (evt) {
      evt.makeRewardedVisible();
    });
    googletag.pubads().addEventListener("rewardedSlotGranted", function () {
      let i = true;
      if (i) {
        if (isHome) {
          window.location.href = "/";
        }
        const s = localStorage.getItem("s");
        if (s !== null) {
          const coins = parseInt(s);
          const newCoins = coins + 100;
          localStorage.setItem("s", newCoins.toString());
        }
      }
    });
    googletag.pubads().addEventListener("rewardedSlotClosed", function () {
      googletag.destroySlots([rewardedSlot]);
    });
    googletag.display(rewardedSlot);
  });
};
