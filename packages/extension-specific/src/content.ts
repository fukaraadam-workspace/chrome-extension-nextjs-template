import { PageEventType, CNMessageType } from 'shared-lib';
import type { CNRequest, CNResponse } from 'shared-lib';
import { BGMessageType } from 'shared-lib';
import type { BGRequest, BGResponse } from 'shared-lib';

console.log('Content script loaded!');

/**
 * Proxy for events from page
 * Generally used to detect events from page and trigger a background script
 */

// Listen for a regular event.
window.addEventListener(PageEventType.PageClick, function (event) {
  chrome.runtime.sendMessage<
    BGRequest<BGMessageType.PageClick>,
    BGResponse<BGMessageType.PageClick>
  >({ ...event, type: BGMessageType.PageClick });
});

// Listen for a custom event.
window.addEventListener(PageEventType.CustomClick, function (event) {
  chrome.runtime.sendMessage<
    BGRequest<BGMessageType.CustomClick>,
    BGResponse<BGMessageType.CustomClick>
  >({ ...event, type: BGMessageType.CustomClick }, (response) => {
    console.log(
      `Background script responded to custom click with: ${response.data}`,
    );
  });
});

/**
 * Listener for runtime.onMessage
 * Generally used by background or AppUi
 */
function extMessageHandler(
  msg: CNRequest<CNMessageType>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: CNResponse<CNMessageType>) => void,
) {
  if (msg.type === CNMessageType.AppUi) {
    const response: CNResponse<typeof msg.type> = {
      data: 'ok',
    };
    sendResponse(response);
  } else {
    console.log('Followin general message recieved!');
    console.log(msg);
    const response: CNResponse<typeof msg.type> = undefined;
  }
}

chrome.runtime.onMessage.addListener(extMessageHandler);
