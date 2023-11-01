let intervalId = new Map();



const addClock = (allURL) => {
    chrome.storage.sync.get(["timer", "allURL", "curURL"], (result) => {

        allURL = JSON.parse(result.allURL);
        allURL.forEach(url => {
            intervalId.set(url, setInterval(() => {
                window.location.reload();
            }, (result.timer * 1000)));
            chrome.storage.sync.set({ intervalIdMap: JSON.stringify(Object.fromEntries(intervalId)) });
        });

    });
};

const removeClock = (url) => {
    clearInterval(intervalId.get(url));
    intervalId.delete(url);
    chrome.storage.sync.set({ intervalIdMap: JSON.stringify(Object.fromEntries(intervalId)) });

};

const matchArray = (newArr, oldArr) => {
    // переменная отвечающая за совпадение двух списков
    let match = true;
    // новый список сравниваем со старым
    //let bool = list.every((element, index) => element == result.clients[index]);
    countNewCLients = newArr.length;
    countOldClients = oldArr.length;
    for (i = 0; i < countNewCLients; i++) {
        let testBool = false;
        for (j = 0; j < countOldClients; j++) {
            if (String(newArr[i]) == String(oldArr[j])) {
                testBool = true;
                continue;
            }
        }
        if (testBool) {
            continue;
        }
        match = false;
        break;
    }
    return match;
};



const notification = (data) => {
    

    let url = 'http://192.168.0.111:8084/test';
    //setTimeout(1000);
    fetch(url, {
        //   mode: 'no-cors',
        // Метод, если не указывать, будет использоваться GET
        method: 'POST',
        // Заголовок запроса
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
            //"mode":'no-cors'
        },
        // Данные
        
        body: JSON.stringify(data)
    })
        // .then(response => response.json())
        .then(response => console.log(JSON.stringify(response) + "123"))

    console.log(JSON.stringify(data));
   //let result = await response.json();
    alert("new client!");
    //result.message;

    // alert(result.message);

    // postData('http://192.168.0.111:8084/', { "message": "new client!))" })
    // .then((data) => {
    //     console.log(data); 
    // });
    //httpGet("http://localhost:8084/");
    //post("http://localhost:8084/", {message: "new client!"});
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://localhost:8084/", true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify({
    //     message: "new client!"
    // }));
};

chrome.storage.sync.get(["checkOnMatch", "allURL", "clients", "tgId", "userId"], (result) => {
    //if( /* если вкладка, которая запрашивает этот код совпадает с обновляемыми вкладками, то даём ей таймер  */ )
    //chrome.storage.sync.set({ test: window.location.href });
    allURL = JSON.parse(result.allURL);
    allURL.forEach(url => {
        if (window.location.href == url) {
            addClock();

        }
    });

    let a = new XMLSerializer();
    html = a.serializeToString(document);

    let doc = new DOMParser().parseFromString(html, "text/html");
    let links = doc.querySelectorAll("#gwt-debug-counter");

    // cписок обновлённых людей
    const list = [];
    //chrome.storage.sync.set({ test: "result.clients.length" });
    const countOldClients = result.clients.length;
    // количество клиентов на странице
    counterNewClient = links.item(1).innerHTML;

    let userId = result.userId;
    for (i = 1; i <= counterNewClient; i++) {
        // нужно создать динамический список, там будут храниться цифры, IM, REQ и тд  
        // для откзоусточивости приложения желатель сделать, чтобы регулярка также искала для +1 и уведомляла пользователя о
        // необходимости новый данных. Интересно, можно ли написать так, чтобы он если нашёл +1, то всё записывает +1
        // или три регулярки с цифрами. А можно вообще без цифр?
        // Внимание! Код в "tbody" может измениться, желательно тоже добавить заменяемость
        userId.forEach( (id) => {
            let reg = new RegExp(`${id}\\d{6}`);
            let endDateClassReg = new RegExp(`<div class="table-datetime-attr">\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\ \\d{1,2}\\:\\d{1,2}`);
            let endDateReg = new RegExp(`\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\ \\d{1,2}\\:\\d{1,2}`);

            
            let getUniversName = doc.querySelectorAll("#gwt-debug-table > tbody:nth-child(3) > tr:nth-child(" + i + ") ");
            
            let userName = new RegExp(`class="link">\\[А-Я][а-я]`);
            console.log(getUniversName.item(0).innerHTML.match(userName) + " " + i);

            let endDateClass = JSON.stringify(getUniversName.item(0).innerHTML.match(endDateClassReg));

            if (endDateClass) {
                //console.log(endDateClass.match(endDateReg) + " " + i);
                
            }
            //console.log(`class="table-datetime-attr "` + getUniversName.item(0).innerHTML.match(endDate) + i);
            //console.log("getUniversName " + getUniversName.item(0).innerHTML);
            list.push(getUniversName.item(0).innerHTML.match(reg));
        })
        
    }

    let data = {
        message: "test_message",
        tgId: result.tgId,
    }

    if (counterNewClient > countOldClients) {
        chrome.storage.sync.set({ clients: list });
        notification(data); 
        return;
    }
    // баг идёт из-за не удаления клиента из массива
    let match = matchArray(list, result.clients);
    chrome.storage.sync.set({ test: counterNewClient + "-" + list + "</p>" + countOldClients + "-" + result.clients });
    if (counterNewClient < countOldClients) {
        // если массивы не совпали
        if (!match) {
            notification(data);
        }

        chrome.storage.sync.set({ clients: list });
        return;
    }

    if (counterNewClient == countOldClients) {
        if (!match) {
            notification(data);
        }

        chrome.storage.sync.set({ clients: list });
        return;
    }



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



