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
    


chrome.storage.sync.get(['onAllRefresh'], (result) => {
    if (result.onAllRefresh) {
        addClock()
        //setTimeout
    }
});

const removeClock = () => {
    clearInterval(intervalId)
    const content = document.querySelector('.easyIt-ext')
    if (content) {
        content.parentNode.removeChild(content)
    }
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes?.onAllRefresh) {
        if (changes.onAllRefresh.newValue) {
            addClock
        } else {
            removeClock
        }
    }
});

