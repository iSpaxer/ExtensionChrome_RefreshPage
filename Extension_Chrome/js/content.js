// первый url, второй тайминг
// он не сохраняет )))))))))))))) ОН просто переписывает при каждом новом запуске.........

 

// chrome.storage.sync.get(["timer"], (result) => {
//     inputAlert.value = result.timer || 5;
// });

let intervalId = new Map();
// chrome.storage.sync.get(['intervalIdMap'], (result) => { 
//     // chrome.storage.sync.set({ test : JSON.stringify(Object.fromEntries(intervalId))  });
//     intervalId = JSON.parse(result.intervalIdMap); 
//     // intervalId.set("key", "value");
//     // chrome.storage.sync.set({ intervalIdMap : JSON.stringify(Object.fromEntries(intervalId)) });
    
// });

const addClock = (url) => {
    
    chrome.storage.sync.get(["timer"], (result) => {
        //chrome.storage.sync.set({ test : "JSON.stringify(Object.fromEntries(intervalId))"  });
        intervalId.set(url, setInterval(() => {
            window.location.reload(1);
        }, (result.timer * 1000) ));
        
        chrome.storage.sync.set({ intervalIdMap : JSON.stringify(Object.fromEntries(intervalId)) });
        //clearInterval(intervalIdMap.get(url));
        // intervalIdMap.delete(url);
    });
}

const removeClock = (url) => {
    //chrome.storage.sync.set({ test : JSON.stringify(Object.fromEntries(intervalId))});

    clearInterval(intervalId.get(url));
    intervalId.delete(url);
    chrome.storage.sync.set({ intervalIdMap : JSON.stringify(Object.fromEntries(intervalId)) });

    
    // const content = document.querySelector('.easyIt-ext')
    // if (content) {
    //     content.parentNode.removeChild(content)
    // }
}

// в момент инит скрипта

chrome.storage.sync.get(['offCurrentRefresh', 'intervalIdMap'], (result) => {
    
    intervalId = new Map(Object.entries(JSON.parse(result.intervalIdMap))); 
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.storage.sync.set({ test : "My URL:" +  tabs[0].url });
    
        
    });

    if (result.offCurrentRefresh) {
       
       //addClock();
       chrome.storage.sync.get(["curURL"], (result) => {  
            addClock(result.curURL);
        });
        
        //setTimeout
    } else {
        chrome.storage.sync.get(["curURL"], (result) => {  
            removeClock(result.curURL);
        });
    }
});


// отслеживание изменение хранилища 
chrome.storage.onChanged.addListener((changes, namespace) => {
    // на какое конкретное изменение был вызван обработчик
    
    if (changes?.offCurrentRefresh) {
        
        // если изменилась переменная offCurrentRefresh
        if (changes.offCurrentRefresh.newValue) {
            chrome.storage.sync.get(["curURL"], (result) => {  
                addClock(result.curURL);
            });
            // chrome.storage.sync.set({ test :  "onChanged"})
            // // получаем исходный юрл
            // //chrome.storage.sync.set({ test : "sadasd?"})
            // chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                   
            //     let ignorAllURL = [];
            //     chrome.storage.sync.get(["ignorAllURL", "test"], (result) => {
            //         if (result.ignorAllURL != undefined)
            //             ignorAllURL = JSON.parse(result.ignorAllURL)
            //     });
            //     checkOnMatch = false;
            //     ignorAllURL.forEach(url => {
            //         if ( url == tabs[0].url ){
            //             checkOnMatch = true;
            //         };
            //     });
                
            //     // если сайт не в игноре и включена галочка
            //     //boolIcon = !(checkOnMatch) && result.offCurrentRefresh;

            //     if (checkOnMatch) {
            //         addClock()
            //     } 
            // });
        } else {
            chrome.storage.sync.get(["curURL"], (result) => {  
                removeClock(result.curURL);
            });
        }   
    }
});

