const clockCheckbox = document.querySelector(".clock-ckeckbox");

chrome.storage.sync.get(["showClock"], (result) => {
  clockCheckbox.checked = result.showClock;
  if (result.showClock) {
    chrome.action.setIcon({
      path: {
          "32": "/icons/iconActive-32.png"
      }
    })
  }
});

if (clockCheckbox) {
    clockCheckbox.addEventListener("click", async (e) => {
      const checked = e.target.checked;
      console.log(checked);
      //chrome.action.setBadgeText({ text: checked ? "ON" : "" });
      chrome.action.setIcon({
        path: {
            "32" : checked ? "/icons/iconActive-32.png" : "/icons/iconNoActive-32.png"
        }
      })
      //chrome.alarms.create({delayInMinutes: minutes});
      chrome.storage.sync.set({ showClock: checked });
    });
} 