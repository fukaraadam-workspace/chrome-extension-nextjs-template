import { generate } from 'random-words';
import { PageEventType, CNMessageType } from 'shared-lib';
import type { CNRequest, CNResponse } from 'shared-lib';
import { BGMessageType } from 'shared-lib';

console.log('Content script loaded! Generating random words...');
console.log(generate());

/**
 * Proxy for events from page
 * Generally used to detect events from page and trigger a background script
 */

// Listen for a regular event.
window.addEventListener(PageEventType.PageClick, function (event) {
  console.log('Page Clicked! Running from content script: ');
  console.log(event);
  chrome.runtime.sendMessage(
    { ...event, type: BGMessageType.PageClick },
    (response) => {
      console.log('Response from background script: ');
      console.log(response);
    },
  );
});

// Listen for a custom event.
window.addEventListener(PageEventType.CustomClick, function (event) {
  console.log('Button Clicked! Running from content script: ');
  console.log(event);
  chrome.runtime.sendMessage(
    { ...event, type: BGMessageType.CustomClick },
    (response) => {
      console.log('Response from background script: ');
      console.log(response);
    },
  );
});

/**
 * Listener for runtime.onMessage
 * Generally used by background or AppUi
 */
function extMessageHandler(
  msg: CNRequest<CNMessageType>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) {
  if (msg.type === CNMessageType.AppUi) {
    const response: CNResponse<typeof msg.type> = {
      data: 'ok',
    };
    sendResponse(response);
  } else {
    console.log('--General message recieved--');
    console.log(msg);
    const response: CNResponse<typeof msg.type> = undefined;
  }
}

chrome.runtime.onMessage.addListener(extMessageHandler);
