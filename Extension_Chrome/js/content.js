let intervalId
 
 setTimeout(function(){
    window.location.reload(1);
 }, 5000);

chrome.storage.sync.get(['showClock'], (result) => {
    if (result.showClock) {
        //addClock()
        setTimeout
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes?.showClock) {
        if (changes.showClock.newValue) {
            setTimeout
        } else {
            clearTimeout()
        }
    }
});