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
chrome.storage.sync.get(["ignoging"], (result) => {
  allURL = result.ignoging;
  //document.querySelector('.out').innerHTML = allURL + " <-"
});

// получение URL сайта, где мы находимся
let currentURL = undefined;
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  currentURL = tabs[0].url
});

// кнопка галочка для "авто-рефреш всех страниц"
const chekMark = [false, false];
const clockCheckbox = document.querySelector(".clock-ckeckbox");
// считываем нажата ли кнопка
chrome.storage.sync.get(["showClock"], (result) => {
  clockCheckbox.checked = result.showClock;
  if (result.showClock) {
    chrome.action.setIcon({
      path: {
          "32": "/icons/iconActive-32.png"
      }
    })
  }
});

// если кнопка "галочка" считана, то создаём ивент на "клик", 
if (clockCheckbox) {
    clockCheckbox.addEventListener("click", async (e) => {
      chekMark[0] = e.target.checked;
      chrome.storage.sync.set({ showClock: chekMark[0] });
      // const checked = e.target.checked;
      // console.log(checked);
      // chrome.action.setIcon({
      //   path: {
      //       "32" : checked ? "/icons/iconActive-32.png" : "/icons/iconNoIncluded-32.png"
      //   }
      // })
      // chrome.storage.sync.set({ showClock: checked });
    });
} 

// кнопка вывода секунд
const inputAlert = document.querySelector(".input-alert");
// кнопка ОК
const buttonAlert = document.querySelector(".alert-button");

console.log(buttonAlert);

//document.querySelector('.out').innerHTML = buttonAlert;

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

// кнопка галочка, для "откл рефреш данной страницы"
const inputDisable = document.querySelector(".disable-ckeckbox");
console.log(inputDisable);

chrome.storage.sync.get(["showDisable"], (result) => {
  if (result.showDisable) {
    chrome.action.setIcon({
      path: {
          "32": "/icons/NoActive-32.png" //icons/iconNoIncluded-32.png"
      }
    })
  }
});

// chrome.storage.sync.get(["showDisable"], (result) => {

//   checkMathURL = currentURL == allURL && (currentURL != undefined);

//   // если юрл совпали
//   if (checkMathURL) {
//     inputDisable.checked = true;
//     document.querySelector('.out').innerHTML = currentURL + "------" + allURL;
//     chrome.action.setIcon({
//       path: {
//         "32" : "/icons/iconNoIncluded-32.png"
//       }
//     })
//   } else { 
//     inputDisable.checked = false;
//   }
//     // обработка клика 
//   inputDisable.addEventListener("click", async (e) => {
//     const checkedDis = e.target.checked;

//     console.log("click-disable");
//     console.log(checkedDis + " disable");
    
    
//     chrome.storage.sync.set({ showDisable: checkedDis });
//     chrome.storage.sync.set({ ignoging: currentURL });
//   })

// });

// document.querySelector('.out').innerHTML = currentURL + "------" + allURL;
// checkMathURL = currentURL == allURL && (currentURL != undefined);
// if (checkMathURL) {
//   inputDisable.checked = true;
//   inputDisable.addEventListener("click", async (e) => {
//     const checkedDis = e.target.checked;

//     console.log("click-disable");
//     console.log(checkedDis + " disable");
    
//     document.querySelector('.out').innerHTML = "que";
//     chrome.storage.sync.set({ showDisable: checkedDis });
//     chrome.storage.sync.set({ ignoging: currentURL });


//   }
// )} else { 
//   inputDisable.checked = false;
// }

// chrome.action.setIcon({
//   path: {
//     "32" : checkMathURL ? "/icons/iconNoIncluded-32.png" : "/icons/iconActive-32.png"
//   }
// })



//   if (clockCheckbox) {
//     clockCheckbox.addEventListener("click", async (e) => {
//       const checked = e.target.checked;
//       console.log(checked);
//       //chrome.action.setBadgeText({ text: checked ? "ON" : "" });
//       chrome.action.setIcon({
//         path: {
//             "32" : checked ? "/icons/iconActive-32.png" : "/icons/iconNoIncluded-32.png"
//         }
//       })
//       //chrome.alarms.create({delayInMinutes: minutes});
//       chrome.storage.sync.set({ showClock: checked });
//     });
// }













