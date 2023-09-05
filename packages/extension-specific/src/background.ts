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
  } else if (msg.type === BGMessageType.CustomClick) {
    console.log('Button Clicked from test app! Responsing now...');
    const response: BGResponse<typeof msg.type> = {
      data: 'ok',
    };
    sendResponse(response);
  } else if (msg.type === BGMessageType.AskConfirmation) {
    console.log('Asking for confirmation from test app! Responsing now...');
    const response: BGResponse<typeof msg.type> = {
      data: 'accepted',
    };
    sendResponse(response);
  } else {
    // <Warning> Don't use here, or it will capture unrelated messages
  }
};

// Fired when a message is sent from either an extension process or another content script.
chrome.runtime.onMessage.addListener(extMessageHandler);
