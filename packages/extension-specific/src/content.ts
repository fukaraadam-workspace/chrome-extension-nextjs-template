import { PageEventType, CNMessageType, BGMessageType } from 'shared-lib';
import type { CNRequest, CNResponse, BGRequest, BGResponse } from 'shared-lib';

console.log('Content script loaded!');

/**
 * Proxy for events from page
 * Generally used to detect events from page and trigger a background script
 */

// Listen for a regular event.
window.addEventListener(PageEventType.PageClick, function (event) {
  chrome.runtime.sendMessage<BGMessageType.PageClick>({
    ...event,
    type: BGMessageType.PageClick,
  });
});

// Listen for a custom event.
window.addEventListener(PageEventType.CustomClick, function (event) {
  chrome.runtime.sendMessage<BGMessageType.CustomClick>(
    { ...event, type: BGMessageType.CustomClick },
    (response) => {
      console.log(
        `Background script responded to custom click with: ${response.data}`,
      );
    },
  );
});

// Listen for a custom event.
window.addEventListener(PageEventType.AskConfirmation, function (event) {
  chrome.runtime.sendMessage<BGMessageType.AskConfirmation>(
    { ...event, type: BGMessageType.AskConfirmation },
    (response) => {
      console.log(
        `Background script responded to confirmation with: ${response.data}`,
      );
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
  sendResponse: <T extends CNMessageType>(response?: CNResponse<T>) => void,
) {
  if (msg.type === CNMessageType.AppUi) {
    sendResponse<typeof msg.type>({
      data: 'ok',
    });
  } else if (msg.type === CNMessageType.General) {
    console.log('Following general message recieved!');
    console.log(msg);
    sendResponse<typeof msg.type>();
  } else {
    // <Warning> Don't use here, or it will capture unrelated messages
  }
}

chrome.runtime.onMessage.addListener(extMessageHandler);
