import { PageEventType, BGMessageType, CNMessageType } from 'shared-lib';
import type { CNRequest, CNResponseMap } from 'shared-lib';

console.log('Content script loaded!');

/**
 * Proxy for events from page
 * Generally used to detect events from page and trigger a background script
 *
 * [Page] => PageRequest => [Content] => BGRequest => [Background] => BGResponse => [Content]
 *
 * <Warning> Do not pass event to sendMessage, it will only pass "isTrusted" property
 */

// Listen for a custom event.
window.addEventListener(PageEventType.CustomClick, async function (event) {
  const response = await chrome.runtime.sendMessage<
    typeof BGMessageType.CustomClick
  >({ type: BGMessageType.CustomClick });

  console.log(
    `Background script responded to custom click with: ${response.data}`,
  );
});

// Listen for a custom event.
window.addEventListener(PageEventType.AskConfirmation, async function (event) {
  const response = await chrome.runtime.sendMessage<
    typeof BGMessageType.AskConfirmation
  >({ type: BGMessageType.AskConfirmation, ...event.detail });

  console.log(`Background script opened popup: ${response.isPopupOpened}`);
});

/**
 * Listener for runtime.onMessage
 *
 * [AppUi] => CNRequest => [Content] => CNResponse => [AppUi]
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
  } else if (msg.type === CNMessageType.Popup) {
    console.log(`Is popup accepted: ${msg.isAccepted}`);
    sendResponse<typeof msg.type>(undefined);
  } else {
    // <Warning> Don't use here, or it will capture unrelated messages
  }
}

chrome.runtime.onMessage.addListener(extMessageHandler);
