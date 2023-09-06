import { BGMessageType } from 'shared-lib';
import type { BGRequest, BGResponseMap } from 'shared-lib';

console.log('Background script loaded!');

/**
 * Listener for runtime.onMessage
 * Generally used by content script
 */
const extMessageHandler = (
  msg: BGRequest,
  sender: chrome.runtime.MessageSender,
  sendResponse: <T extends typeof msg.type>(
    response?: BGResponseMap[T],
  ) => void,
) => {
  if (msg.type === BGMessageType.PageClick) {
    console.log(`Page Clicked from ${sender.tab?.url}!`);
    sendResponse<typeof msg.type>();
  } else if (msg.type === BGMessageType.CustomClick) {
    console.log('Button Clicked from test app! Responsing now...');
    sendResponse<typeof msg.type>({
      data: 'ok',
    });
  } else if (msg.type === BGMessageType.AskConfirmation) {
    console.log('Asking for confirmation from test app! Responsing now...');
    sendResponse<typeof msg.type>({
      data: 'accepted',
    });
  } else {
    // <Warning> Don't use here, or it will capture unrelated messages
  }
};

// Fired when a message is sent from either an extension process or another content script.
chrome.runtime.onMessage.addListener(extMessageHandler);
