const onClickSett = async(e) => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let url = chrome.runtime.getURL("html/settings.html");
    let tab = await chrome.tabs.create({ url });
  }

  const onClickClose = async(e) => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    chrome.tabs.remove(tab.id);
  }
  
  const btnClose = document.querySelector('.close-button')
  if (btnClose){
    btnClose.addEventListener('click', onClickClose);
  }

  const btnSet = document.querySelector('.set-button')
  if (btnSet){
    btnSet.addEventListener('click', onClickSett);
  }
  