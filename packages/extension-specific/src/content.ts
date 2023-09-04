import { generate } from 'random-words';

console.log('Content script loaded! Generating random words...');
console.log(generate());

// Listener for messages from window/FCL
window.addEventListener('click', function (event) {
  console.log('Page Clicked! Running from content script: ');
  console.log(event);
  chrome.runtime.sendMessage({ ...event, type: 'click' });
});
