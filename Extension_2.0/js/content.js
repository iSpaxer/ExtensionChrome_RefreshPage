let intervalId = new Map();

const addClock = (allURL) => {
    chrome.storage.sync.get(["timer", "allURL"], (result) => {
    
        allURL = JSON.parse(result.allURL);
        allURL.forEach(url => {
            intervalId.set(url, setInterval(() => {
                window.location.reload(1);
            }, (result.timer * 1000) ));
        });
        chrome.storage.sync.set({ intervalIdMap : JSON.stringify(Object.fromEntries(intervalId)) });
    });
};

const removeClock = (url) => {
    clearInterval(intervalId.get(url));
    intervalId.delete(url);
    chrome.storage.sync.set({ intervalIdMap : JSON.stringify(Object.fromEntries(intervalId)) });

};

chrome.storage.sync.get(["checkOnMatch"], (result) => {
    addClock();
});

// отслеживание изменение хранилища 
chrome.storage.onChanged.addListener((changes, namespace) => {
    // на какое конкретное изменение был вызван обработчик
    if (changes?.deleteURL) {
        // если изменилась переменная deleteURL
        if (changes.deleteURL.newValue) {
            chrome.storage.sync.get(["deleteURL"], (result) => { 
                removeClock(result.deleteURL);
            });
        } 
    }
});