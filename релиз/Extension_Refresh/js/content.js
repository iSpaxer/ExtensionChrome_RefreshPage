let intervalId = new Map();

const addClock = (allURL) => {
    chrome.storage.sync.get(["timer", "allURL", "curURL"], (result) => {
    
        allURL = JSON.parse(result.allURL);
        allURL.forEach(url => {
                intervalId.set(url, setInterval(() => {
                    window.location.reload();
                }, (result.timer * 1000) ));
                chrome.storage.sync.set({ intervalIdMap : JSON.stringify(Object.fromEntries(intervalId)) });
        });
        
    });
};

const removeClock = (url) => {
    clearInterval(intervalId.get(url));
    intervalId.delete(url);
    chrome.storage.sync.set({ intervalIdMap : JSON.stringify(Object.fromEntries(intervalId)) });

};

chrome.storage.sync.get(["checkOnMatch", "allURL"], (result) => {
    chrome.storage.sync.set({ test : window.location.href}); 
    allURL = JSON.parse(result.allURL);
    allURL.forEach(url => { 
        if ( window.location.href == url ){
            addClock();
        }
    });
    
});

// отслеживание изменение хранилища 
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes?.deleteURL) {
        if (changes.deleteURL.newValue) {
            chrome.storage.sync.get(["deleteURL"], (result) => { 
                removeClock(result.deleteURL);
            });
        } 
    }
});

