// кнопка ссылка хелпа
const helpButton = document.querySelector(".help-page");

// если кнопка "хелпа" считана
if (helpButton) {
  helpButton.addEventListener("click", (e) => {
    const url = chrome.runtime.getURL("/html/hello.html");
    chrome.tabs.create({ url });
    window.close();
  });
}

// получение всех URL
let allURL = undefined;
chrome.storage.sync.get(["ignorAllURL"], (result) => {
  allURL = result.ignorAllURL;
  //document.querySelector('.out').innerHTML = allURL + " <-"
});

// получение URL сайта, где мы находимся
let currentURL = undefined;
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  currentURL = tabs[0].url
});


// кнопка галочка для "авто-рефреш всех страниц"
const clockCheckbox = document.querySelector(".clock-ckeckbox");

// считываем нажата ли кнопка из локального хранилища
chrome.storage.sync.get(["onAllRefresh"], (result) => {
  clockCheckbox.checked = result.onAllRefresh;
  // if (result.onAllRefresh) {
  //   chrome.action.setIcon({
  //     path: {
  //         "32": "/icons/iconActive-32.png"
  //     }
  //   })
  // }
});

// кнопка галочка, для "откл рефреш данной страницы"
const markDisable = document.querySelector(".disable-ckeckbox");
console.log(markDisable);

// считываем все сайты, которые мы игнорим и если url сайта совпал с игнорируемыми, то галка включена
chrome.storage.sync.get(["ignorAllURL", "offCurrentRefresh"], (result) => {

  if (result.ignorAllURL == currentURL) {
    result.offCurrentRefresh = true;
    markDisable.checked = true;
  } else {
    result.offCurrentRefresh = false;
    markDisable.checked = false;
  }

  // document.querySelector('.out').innerHTML = result.ignorAllURL +"</p>" + currentURL + 
  // "</p> галка на откл этой страницы " + result.offCurrentRefresh;
})

// если кнопка "галочка" считана, то создаём ивент на "клик", 
if (clockCheckbox) {

  // срабатывает только при нажатии
  clockCheckbox.addEventListener("click", async (e) => {
    //chekMark[0] = e.target.checked;
    //document.querySelector('.out').innerHTML = chekMark[0];
    chrome.storage.sync.set({ onAllRefresh: e.target.checked });
  });
} 

// если нажата "галочка" отключения этого сайта из автообновления
if (markDisable) {
  // срабатывает только при нажатии  
  markDisable.addEventListener("click", async (e) => {

    chrome.storage.sync.set({ ignorAllURL : currentURL })
    chrome.storage.sync.set({ offCurrentRefresh : e.target.checked })
    
  });
}

const applyButton = document.querySelector(".apply-button");

if (applyButton) {
  
  applyButton.addEventListener("click", async (e) => {
    
    chrome.storage.sync.get(['onAllRefresh', 'offCurrentRefresh', 'test'], (result) => {
      document.querySelector('.out').innerHTML = result.test;
      // если работа с галками
      chrome.action.setIcon({
        path: {
            "32" : (result.onAllRefresh && !result.offCurrentRefresh) ? "/icons/iconActive-32.png" : "/icons/iconNoIncluded-32.png"
        }
      })
    })
    
   // window.close();
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
    //chrome.alarms.create({ delayInSec: sec });
    if(sec >= 5)
      window.close();
    else {
      chrome.storage.sync.set({ timer: 5 });
    }
  });

  chrome.storage.sync.get(["timer"], (result) => {
    inputAlert.value = result.timer || 5;
  });
}














