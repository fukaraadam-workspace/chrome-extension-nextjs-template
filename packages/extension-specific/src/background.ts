import { generate } from 'random-words';
import { BGMessageType } from 'shared-lib';
import type { BGRequest, BGResponse } from 'shared-lib';

console.log('Background script loaded! Generating random words...');
console.log(generate());

/**
 * Listener for runtime.onMessage
 * Generally used by content script
 */
const extMessageHandler = (
  msg: BGRequest<BGMessageType>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) => {
  if (msg.type === BGMessageType.PageClick) {
    console.log('Page Clicked! Running from background script: ');
    console.log('Send from tab with url: ', sender.tab?.url);
    const response: BGResponse<typeof msg.type> = {
      data: 'ok',
    };
    sendResponse(response);
  } else {
    console.log('--General message recieved--');
    console.log(msg);
    console.log('Send from tab with url: ', sender.tab?.url);
    const response: BGResponse<typeof msg.type> = undefined;
  }
};

// Fired when a message is sent from either an extension process or another content script.
chrome.runtime.onMessage.addListener(extMessageHandler);
