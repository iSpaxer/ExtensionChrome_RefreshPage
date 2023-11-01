// Обработчик первого запуска/нового обновления расширения 
chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL("html/settings.html");
    let tab = await chrome.tabs.create({ url });

    let intervalId = new Map();
    chrome.storage.sync.set({ intervalIdMap : JSON.stringify(Object.fromEntries(intervalId)) });

    let clients = [];
    chrome.storage.sync.set({ "clients" : clients });

    chrome.storage.sync.get(['timer'], (result) => {
        console.log('result', result)
        if (!result.timer) {
          chrome.storage.sync.set({ 'timer': 5 })
        }
      });
});

// срабатывает при переходе по вкладкам
chrome.tabs.onActivated.addListener( ()=> {
    chrome.storage.sync.get(["allURL"], (result) => { 
      
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        
        //chrome.storage.sync.set({ curURL : tabs[0].url });
  
        let allURL = [];
        if (result.allURL != undefined)
          allURL = JSON.parse(result.allURL);
        
          
        // проверка на совпадение
        checkOnMatch = false;
        allURL.forEach(url => {
          if ( url == tabs[0].url ){
            checkOnMatch = true;
            chrome.storage.sync.set({ refresh : true });
          };
        });
        chrome.storage.sync.set({ "checkOnMatch" : checkOnMatch })
        chrome.action.setIcon({
          path: {
              "32" : checkOnMatch ? "/icons/iconActive-32.png" : "/icons/iconNoActive-32.png"
          }
        })
  
        
      });
    })
  })