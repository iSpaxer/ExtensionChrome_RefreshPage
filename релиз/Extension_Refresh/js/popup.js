// получение URL сайта, где мы находимся
let currentURL = undefined;
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  currentURL = tabs[0].url;
  chrome.storage.sync.set({ curURL : tabs[0].url });
});
console.log("получение URL сайта, где мы находимся" + currentURL);

// получение всех URL
let allURL = [];
chrome.storage.sync.get(["allURL", "test", "intervalIdMap", "deleteURL"], (result) => {
  
  if (result.allURL != undefined)
    allURL = JSON.parse(result.allURL);
});

// кнопка галочка, "включения рефреш данной страницы"
const markRefresh = document.querySelector(".refresh-ckeckbox");

// считываем нажата ли галочка на этой странице и записываем эти данные в popup.html
chrome.storage.sync.get(["checkOnMatch"], (result) => { 
    markRefresh.checked = result.checkOnMatch;
});

// если галочка нажата, то создаём ивент реагирующий на клик. 
// А так же тут же меняем фон расширения 
if (markRefresh) {
    markRefresh.addEventListener("click", async (e) => {
        click = e.target.checked;                   // считывание нажатия кнопки
        addedUrl = allURL.includes(currentURL);     // сайт добавлен в обновляемые? true : false
        chrome.storage.sync.set({ refresh : click });
        chrome.action.setIcon({
            path: {
                "32" : click ? "/icons/iconActive-32.png" : "/icons/iconNoActive-32.png"
            }
          });
        // если галка включена и url сайта ещё не добавлен, то мы добавляем сайт в обновляемые
        // в противном случае, мы удаляем его из обновляемых
        if (click && !(addedUrl) ) {
            allURL.push(currentURL);
        } if (!click && addedUrl) {
            
            allURL.splice(allURL.lastIndexOf(currentURL), 1);
            chrome.storage.sync.set({ deleteURL : currentURL });
            
        }
        chrome.storage.sync.set({ allURL : JSON.stringify(allURL) })
        chrome.storage.sync.set({ checkOnMatch : click })
    });
}

// кнопка ссылка хелпа
const helpButton = document.querySelector(".help-page");

if (helpButton) {
  helpButton.addEventListener("click", (e) => {
    const url = chrome.runtime.getURL("/html/hello.html");
    chrome.tabs.create({ url });
    window.close();
  });
}

// кнопка вывода секунд
const inputAlert = document.querySelector(".input-alert");
// кнопка ОК
const buttonAlert = document.querySelector(".alert-button");

console.log(buttonAlert);

// если кнопка ОК "связана", создаём для неё ивент на "клик"
if (buttonAlert) {
  buttonAlert.addEventListener("click", async (e) => {
    console.log("click");
    const sec = parseFloat(inputAlert.value);
    chrome.storage.sync.set({ timer: sec });
    if (sec >= 5)
      window.close();
    else {
      chrome.storage.sync.set({ timer: 5 });
    }
  });

  chrome.storage.sync.get(["timer"], (result) => {
    inputAlert.value = result.timer || 5;
  });
}

const resetButton = document.querySelector(".reset-storage-button");

if (resetButton) {
  resetButton.addEventListener("click", async (e) => {
    chrome.storage.local.remove("allURL", function() {
      console.log("Key 'allURL' removed from local storage");
    });
    chrome.action.setIcon({
      path: {
          "32" : "/icons/iconNoActive-32.png"
      }
    });
    chrome.storage.sync.clear();
  })
  
}