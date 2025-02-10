document.getElementById('open-page').addEventListener('click', () => {
  chrome.windows.getCurrent((window) => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('../background/document.html'),
      active: true,
      windowId: window.id,
    });
  });
});