import { generate } from 'random-words';

console.log('Content script loaded! Generating random words...');
console.log(generate());

// Listener for messages from window/FCL
window.addEventListener('click', function (event) {
  console.log('Page Clicked! Running from content script: ');
  console.log(event);
  chrome.runtime.sendMessage({ ...event, type: 'click' }, (response) => {
    console.log('Response from background script: ');
    console.log(response);
  });
});

function extMessageHandler(
  msg: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) {
  msg.type;
  if (msg.type === 'message-appUi') {
    msg.type;
    console.log('---Message from appUi---');
    console.log('Message: ', msg.data);
    sendResponse({ data: 'ok' });
  }
}

chrome.runtime.onMessage.addListener(extMessageHandler);
