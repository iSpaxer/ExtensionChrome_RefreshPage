// первый url, второй тайминг
// он не сохраняет )))))))))))))) ОН просто переписывает при каждом новом запуске.........
let intervalId = new Map();

// chrome.storage.sync.get(["timer"], (result) => {
//     inputAlert.value = result.timer || 5;
// });

const addClock = (url) => {
    chrome.storage.sync.get(["timer"], (result) => {
        intervalId.set(url, setInterval(() => {
            window.location.reload(1)
        }, (result.timer * 1000) ));
        chrome.storage.sync.set({ test : ")))" + JSON.stringify(Object.fromEntries(intervalId)) + url})
        //clearInterval(intervalId.get(url));
        // intervalId.delete(url);
        
    });
}

const removeClock = (url) => {
    chrome.storage.sync.set({ test : JSON.stringify(Object.fromEntries(intervalId))})
    clearInterval(intervalId.get(url));
    intervalId.delete(url);
    // const content = document.querySelector('.easyIt-ext')
    // if (content) {
    //     content.parentNode.removeChild(content)
    // }
}

// в момент инит скрипта
chrome.storage.sync.get(['offCurrentRefresh'], (result) => {
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

