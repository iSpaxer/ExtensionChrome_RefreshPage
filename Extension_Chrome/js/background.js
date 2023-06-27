
// Обработчик первого запуска/нового обновления расширения 
chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL("html/hello.html");
    let tab = await chrome.tabs.create({ url });
    chrome.storage.sync.get(['showClock'], (result) => {
      if (result.showClock) {
        //chrome.action.setBadgeText({ text: 'ON' });
        chrome.action.setIcon({
          path: {
              "32": "/icons/iconActive-32.png"
          }
        })
      }
    });
  
    chrome.storage.sync.get(['timer'], (result) => {
      console.log('result', result)
      if (!result.timer) {
        chrome.storage.sync.set({ 'timer': 1 })
      }
    });
  });

  // Обработчик горячих клавишей
//   chrome.commands.onCommand.addListener( (command) => {

//     chrome.tabs.update({}, async (tab) => {
//       debugger
//       if (command == 'pin-current-tab') {
//         chrome.tabs.update({ pinned: !tab.pinned });
//       } else if (command == 'move-to-first') {
//         chrome.tabs.move(tab.id, { index: 0 });
//       }
//       else if (command == 'move-to-last') {
//         const allTabs = await chrome.tabs.query({})
//         chrome.tabs.move(tab.id, { index: allTabs.length - 1 });
//       }
//       else if (command == 'copy-current-tab') {
//         chrome.tabs.duplicate(tab.id);
//       }
//     });
//   });