const clockCheckbox = document.querySelector(".clock-ckeckbox");

chrome.storage.sync.get(["showClock"], (result) => {
  clockCheckbox.checked = result.showClock;
  if (result.showClock) {
    chrome.action.setBadgeText({ text: "ON" });
  }
});

if (clockCheckbox) {
    clockCheckbox.addEventListener("click", async (e) => {
      const checked = e.target.checked;
      console.log(checked);
      chrome.action.setBadgeText({ text: checked ? "ON" : "" });
      //chrome.alarms.create({delayInMinutes: minutes});
      chrome.storage.sync.set({ showClock: checked });
    });
  }