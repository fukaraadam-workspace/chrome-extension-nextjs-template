import { PageEventType, BGMessageType, CNMessageType } from 'shared-lib';
import type { CNRequest, CNResponseMap } from 'shared-lib';

console.log('Content script loaded!');

/**
 * Proxy for events from page
 * Generally used to detect events from page and trigger a background script
 */

// Listen for a regular event.
window.addEventListener(PageEventType.PageClick, function (event) {
  chrome.runtime.sendMessage<typeof BGMessageType.PageClick>({
    type: BGMessageType.PageClick,
  });
});

// Listen for a custom event.
window.addEventListener(PageEventType.CustomClick, function (event) {
  chrome.runtime.sendMessage<typeof BGMessageType.CustomClick>(
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
  chrome.runtime.sendMessage<typeof BGMessageType.AskConfirmation>(
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
  msg: CNRequest,
  sender: chrome.runtime.MessageSender,
  sendResponse: <T extends typeof msg.type>(response: CNResponseMap[T]) => void,
) {
  if (msg.type === CNMessageType.AppUi) {
    sendResponse<typeof msg.type>({
      data: 'ok',
    });
  } else if (msg.type === CNMessageType.General) {
    console.log('Following general message recieved!');
    console.log(msg);
    sendResponse<typeof msg.type>(undefined);
  } else {
    // <Warning> Don't use here, or it will capture unrelated messages
  }
}

chrome.runtime.onMessage.addListener(extMessageHandler);
