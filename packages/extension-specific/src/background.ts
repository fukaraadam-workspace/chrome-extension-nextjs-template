import { generate } from 'random-words';

console.log('Background script loaded! Generating random words...');
console.log(generate());

function reddenPage() {
  console.log('Extension Button Clicked! Running from page');
  document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url?.includes('chrome://') && tab.id) {
    console.log('Extension Button Clicked! Running from extension');
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: reddenPage,
    });
  }
});
