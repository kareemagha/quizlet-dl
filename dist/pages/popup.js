// popup.js
document.getElementById('open-page').addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('../background/document.html') });
});
