document.getElementById('open-page').addEventListener('click', () => {
  chrome.windows.getCurrent((window) => {
    const isIncognito = window.incognito;
    chrome.tabs.create({
      url: chrome.runtime.getURL('../background/document.html'),
      active: true,
      windowId: window.id,
    });
  });
});