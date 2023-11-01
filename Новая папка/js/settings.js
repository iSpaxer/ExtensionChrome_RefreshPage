


let counterTgId = 0;
const addTgId = document.querySelector(".button-add-more-tgId");
const tgIdInputs = document.querySelector(".tgId-inputs");
const tgId = document.querySelector(".tgId");

let counterUserId = 0;
const addUserId = document.querySelector(".button-add-more-userId");
const userIdInputs = document.querySelector(".userId-inputs");
const userId = document.querySelector(".userId");

const autocreateTgId = (tgIdList) => {

    lengthTgId = tgIdList.length;
    console.log(lengthTgId + " lengthTg ID" + tgIdList);
    
    for (let i = 0; i < lengthTgId; i++) {
                                                   
        if (i == 0) {                              
            const tgId_0 = document.querySelector("body > div > div > div.tgId > div.tgId-inputs > div > input.input-tgId-0");
            tgId_0.value = tgIdList[i];
            continue;
        }

        counterTgId++;
        const div = document.createElement("div");
        div.classList = "tgId-input-" + counterTgId;
    
            const input = document.createElement("input");
            input.type = "number";
            input.value = tgIdList[i];
            input.classList = "input-tgId-" + counterTgId;
    
            const space = document.createElement("p");
        
        div.appendChild(space);
        div.appendChild(input);
    
        tgIdInputs.appendChild(div);
    }
}

// cписок сданными, названия для html, вставка в html, колонка инпута (текст, числа), счётчик
const autocreateAllId = (idList, nameList, idInputs, typeInput, counter) => {

    length = idList.length;
    console.log(length + " lengthTg ID" + idList);
    
    for (let i = 0; i < length; i++) {
                                                   
        if (i == 0) {                              
            const id_0 = document.querySelector(`body > div > div > div.${nameList} > div.${nameList}-inputs > div > input.input-${nameList}-0`);
            id_0.value = idList[i];
            continue;
        }

        counter++;
        const div = document.createElement("div");
        div.classList = `${nameList}-input-${counter}`;
    
            const input = document.createElement("input");
            input.type = typeInput;
            input.value = idList[i];
            input.classList = `input-${nameList}-${counter}`;
    
            const space = document.createElement("p");
        
        div.appendChild(space);
        div.appendChild(input);
    
        idInputs.appendChild(div);
    }
    return counter;
}

chrome.storage.sync.get(["tgId", "userId"], (result) => { 
    if (result.tgId )
        counterTgId = autocreateAllId(result.tgId, "tgId", tgIdInputs, "number", counterTgId);
    if (result.userId )
        counterUserId = autocreateAllId(result.userId, "userId", userIdInputs, "text", counterUserId);
});



const deleteTgId = () => {
 //   console.log("зачем?");
    let id = counterTgId;
    let deleteId = document.querySelector(".tgId-input-" + id);
    console.log(".tgId-input-" + id + " -id");
    deleteId.remove();
    counterTgId--;
    saveTgId();
}

const deleteUserId = () => {
    //   console.log("зачем?");
       let deleteId = document.querySelector(".userId-input-" + counterUserId);
       console.log(".userId-input-" + counterUserId + " -id");
       deleteId.remove();
       counterUserId--;
       saveUserId();
   }

// const deleteAllId = (listId, nameList, counter) => {
//     //   console.log("зачем?");
//     let deleteId = document.querySelector(`.${nameList}-input-${counter}`);
//     console.log(`.${nameList}-input-${counter}-id`);
//     deleteId.remove();
//     counter--;
//     saveTgId();
//     return counter;
// }

let listTgId = [];
let listUserId = [];

const saveTgId = () => {
    const list = [];
    for (let i = 0; i <= counterTgId; i++) {
        let readId = document.querySelector('.input-tgId-' + i);
        //console.log(readId.value + "?");
        if (readId !== null && readId !== undefined && readId.value != '') {
            list.push(readId.value);
        }
    }
    listTgId = list;
    //chrome.storage.sync.set({ tgId : list })
    console.log(list);
}

const saveUserId = () => {
    const list = [];
    for (let i = 0; i <= counterUserId; i++) {
        let readId = document.querySelector('.input-userId-' + i);
        //console.log(readId.value + "?");
        if (readId !== null && readId !== undefined && readId.value != '') {
            list.push(readId.value);
        }
    }
    listUserId = list;
    //chrome.storage.sync.set({ tgId : list })
    console.log(listUserId);
}

document.getElementById("saveTgId").addEventListener("click", saveTgId);
document.getElementById("deleteLastTgId").addEventListener("click", deleteTgId);

document.getElementById("saveUserId").addEventListener("click", saveUserId);
document.getElementById("deleteLastUserId").addEventListener("click", deleteUserId);

const createInputTgId = () => {
    counterTgId++;
    const div = document.createElement("div");
    div.classList = "tgId-input-" + counterTgId;
    
    const input = document.createElement("input");
    input.type = "number";
    input.classList = "input-tgId-" + counterTgId;
    
    const space = document.createElement("p");
    
    div.appendChild(space);
    div.appendChild(input);
    
    tgIdInputs.appendChild(div);
}

const createInputAllId = (nameList, idInputs, typeInput, counter) => {
    counter++;
    const div = document.createElement("div");
    div.classList = `${nameList}-input-${counter}`;

    const input = document.createElement("input");
    input.type = typeInput;
    input.classList = `input-${nameList}-${counter}`;

    const space = document.createElement("p");
    
    div.appendChild(space);
    div.appendChild(input);

    idInputs.appendChild(div);

    return counter;
}

if (addTgId) {
    addTgId.addEventListener("click", (e) => {
        // createInputTgId();
        counterTgId = createInputAllId("tgId", tgIdInputs, "number", counterTgId);
        console.log(counterTgId + "counterTgId");
        console.log("addUserId " + addUserId);
    });
}

if (addUserId) {
    addUserId.addEventListener("click", (e)  => {
        counterUserId = createInputAllId("userId", userIdInputs, "text", counterUserId);
    });
}


/*_____________________________________________ */
let data = {
    message: "text2.0"
}

chrome.storage.sync.get(["tgId"], (result) => { 
    console.log("added tgId in data "  + result.tgId);
    data.tgId = result.tgId;
});

const onClick = async (e) => {

    saveTgId();
    saveUserId();

    chrome.storage.sync.set({ userId : listUserId })
    chrome.storage.sync.set({ tgId : listTgId })
    
    console.log(typeof listUserId[0]);
    // console.log(JSON.stringify(data) + 'data' );


    let queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    chrome.tabs.remove(tab.id);
}

const btn = document.querySelector('.ok-button')
if (btn) {
    btn.addEventListener('click', onClick);
}




// chrome.storage.sync.get(["tgId"], (result) => { 
//     let quantityId = tgId.result.length;

//     for (let i = 0; i < quantityId; i++) {
//         createInputTgId();
//     }
// });


// let deleteTgId;
// console.log(counterTgId);
// for (let i = 0; i < counterTgId; i++) {
//     let deleteTgId = document.querySelector(".button-delete-tgId-" + i);
//     console.log(i + " -i");
//     deleteTgId.addEventListener("click", (e) => {
//         //tgId = document.querySelector("body > div > div > div.tgId > div.tgId-inputs-" + i);
//         tgId.remove();
//     });
// }


// for (let i = 0; i < counterTgId; i++ ){
//     console.log(" " + i);
//     let deleteTgId = document.querySelector("body > div > div > div.tgId > div.tgId-inputs > div.tgId-input-1 > input.button-delete-tgId-" + i);

//     deleteTgId.addEventListener("click", (e) => {
//         tgId = document.querySelector("body > div > div > div.tgId > div.tgId-inputs-" + i);
//         tgId.remove();
//     });
// }