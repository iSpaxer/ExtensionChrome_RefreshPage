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

let idMessage = [];

const matchArray = (newArr, oldArr) => {
    // переменная отвечающая за совпадение двух списков
    let match = true;
    // новый список сравниваем со старым
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
        idMessage.push(i);
        match = false;
    }
    return match;
};


const notification = (data) => {


    let url = 'http://localhost:8084/test';

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },

        body: JSON.stringify(data)
    })
        .then(response => console.log(JSON.stringify(response) + "123"))

    console.log(JSON.stringify(data));
};

let endDateList = [];
let divisionList = [];
let serviceList = [];
let responsibleList = [];

chrome.storage.sync.get(["checkOnMatch", "allURL", "clients", "tgId", "userId"], (result) => {


    allURL = JSON.parse(result.allURL);
    allURL.forEach(url => {
        if (window.location.href == url) {
            addClock();

            setTimeout(() => {

                    let a = new XMLSerializer();
                    html = a.serializeToString(document);

                    let doc = new DOMParser().parseFromString(html, "text/html");
                    let links = doc.querySelectorAll("#gwt-debug-counter");

                    // cписок обновлённых людей
                    const list = [];
                    //chrome.storage.sync.set({ test: "result.clients.length" });
                    const oldClients = result.clients;
                    let countOldClients;
                    if (oldClients == null || oldClients == undefined) {
                        oldClients = [];
                        countOldClients = 0;
                    } else {
                        countOldClients = oldClients.length;
                    }
                    // количество клиентов на странице
                    counterNewClient = links.item(1).innerHTML;

                    let userId = result.userId;
                    for (i = 1; i <= counterNewClient; i++) {

                        userId.forEach((id) => {
                            let reg = new RegExp(`${id}\\d{6}`);
                            let endDateClassReg = new RegExp(`<div class="table-datetime-attr">\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\ \\d{1,2}\\:\\d{1,2}`);

                            let getUniversName = doc.querySelectorAll("#gwt-debug-table > tbody:nth-child(3) > tr:nth-child(" + i + ") ");

                            let foundUserId = getUniversName.item(0).innerHTML.match(reg);
                            //console.log(foundUserId);
                            if (foundUserId) {
                                list.push(foundUserId);
                                ///console.log("ess");
                                let endDateReg = new RegExp(`\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\ \\d{1,2}\\:\\d{1,2}`, "g");
                                //let userNameReg = new RegExp(`>[А-Я ][а-я ]+ [А-Я ][а-я ]+ [А-Я ][а-я ]+`);
                                let divisionReg = new RegExp(`>[А-Яа-я a-zA-Z\.\-]+</a`, "g");
                                let __divisionReg = new RegExp(`[А-Яа-я a-zA-Z\.\-]+`);

                                // можно просто окончания
                                endDateList.push(getUniversName.item(0).innerHTML.match(endDateReg).at(1));
                                divisionList.push(getUniversName.item(0).innerHTML.match(divisionReg).at(0).match(__divisionReg).at(0));
                                serviceList.push(getUniversName.item(0).innerHTML.match(divisionReg).at(1).match(__divisionReg).at(0));
                                let __a = getUniversName.item(0).innerHTML.match(divisionReg).at(2);
                                if (__a) {
                                    responsibleList.push(__a.match(__divisionReg).at(0));
                                } else {
                                    responsibleList.push("-");
                                }

                            }
                        })
                    }
                    console.log(endDateList);
                    //console.log(userNameList);
                    console.log(divisionList);
                    console.log(serviceList);
                    console.log(responsibleList);


                    let match = matchArray(list, oldClients);
                    console.log("idMessage " + idMessage);
                    let sms = "";
                    if (idMessage == -1) {
                        sms = "";
                    } else {
                        idMessage.forEach((element) => {
                            sms += "Новое обращение: " + JSON.stringify(list[element]) +
                                "\nОт: " + JSON.stringify(divisionList[element]) +
                                "\nС услугой: " + JSON.stringify(serviceList[element]) +
                                "\nОтвественный сотрудник: " + JSON.stringify(responsibleList[element]) +
                                //"\n Новый пользователь: " + JSON.stringify(userNameList[idMessage]) +
                                "\nСо сроком до: " + JSON.stringify(endDateList[element]) + "\n_________________\n";
                        })
                    }
                    let data = {
                        message: sms,
                        tgId: result.tgId,
                    }

                    if (counterNewClient > countOldClients) {
                        chrome.storage.sync.set({ clients: list });
                        notification(data);
                        return;
                    }

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


                }, 10000);

        }
    });
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



