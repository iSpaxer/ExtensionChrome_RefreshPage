let intervalId

// chrome.storage.sync.get(["timer"], (result) => {
//     inputAlert.value = result.timer || 5;
// });

const addClock = () => {
    chrome.storage.sync.get(["timer"], (result) => {
        intervalId = setInterval(() => {
            window.location.reload(1)
        }, (result.timer * 1000) )
    });
}
    


chrome.storage.sync.get(['offCurrentRefresh'], (result) => {
    if (result.offCurrentRefresh) {
        addClock();
        //setTimeout
    } else {
        removeClock();
    }
});

const removeClock = () => {
    clearInterval(intervalId)
    const content = document.querySelector('.easyIt-ext')
    if (content) {
        content.parentNode.removeChild(content)
    }
}

// отслеживание изменение хранилища 
chrome.storage.onChanged.addListener((changes, namespace) => {
    // на какое конкретное изменение был вызван обработчик
    chrome.storage.sync.set({ test : "asd" })
    if (changes?.offCurrentRefresh) {
        // если добавился сайт в игнор
        
        if (changes.offCurrentRefresh.newValue) {
            // получаем исходный юрл
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                   
                let ignorAllURL = [];
                chrome.storage.sync.get(["ignorAllURL", "test"], (result) => {
                    if (result.ignorAllURL != undefined)
                        ignorAllURL = JSON.parse(result.ignorAllURL)
                });
                checkOnMatch = false;
                ignorAllURL.forEach(url => {
                if ( url == tabs[0].url ){
                    checkOnMatch = true;
                };
                });
                
                // если сайт не в игноре и включена галочка
                //boolIcon = !(checkOnMatch) && result.onAllRefresh;

                chrome.storage.sync.set({ test : checkOnMatch})

                if (checkOnMatch) {
                    addClock()
                } else {
                    removeClock()
                }
            });
        }
 
    }
});

