import { generate } from 'random-words';

console.log('Background script loaded! Generating random words...');
console.log(generate());

const extMessageHandler = (
  msg: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) => {
  if (msg.type === 'click') {
    console.log('Page Clicked! Running from background script: ');
    console.log('Send from tab with url: ', sender.tab?.url);
  }
};

// Fired when a message is sent from either an extension process or another content script.
chrome.runtime.onMessage.addListener(extMessageHandler);
