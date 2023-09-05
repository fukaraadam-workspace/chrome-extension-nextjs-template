import { BGMessageType } from 'shared-lib';
import type { BGRequest, BGResponse } from 'shared-lib';

console.log('Background script loaded!');

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
    console.log(`Page Clicked from ${sender.tab?.url}!`);
    const response: BGResponse<typeof msg.type> = undefined;
  } else {
    console.log('Button Clicked from test app! Responsing now...');
    const response: BGResponse<typeof msg.type> = {
      data: 'ok',
    };
    sendResponse(response);
  }
};

// Fired when a message is sent from either an extension process or another content script.
chrome.runtime.onMessage.addListener(extMessageHandler);
