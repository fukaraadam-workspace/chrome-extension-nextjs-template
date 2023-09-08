import { BGMessageType } from 'shared-lib';
import type { BGRequest, BGResponseMap } from 'shared-lib';

console.log('Background script loaded!');

/**
 * Popup Handling
 */
let currentPopup: chrome.windows.Window | undefined;

function triggerPopup(question: string) {
  const handlePopupClosed = (windowId: number) => {
    if (currentPopup && windowId == currentPopup.id) {
      currentPopup = undefined;
    }
  };

  if (!currentPopup) {
    const popupPath = chrome.runtime.getURL(`./popup.html`);
    let popupUrl = new URL(popupPath);
    popupUrl.searchParams.append('question', question);
    chrome.windows
      .create({
        url: popupUrl.toString(),
        type: 'popup',
        height: 600,
        width: 400,
        left: 500,
      })
      .then((window) => {
        currentPopup = window;
        chrome.windows.onRemoved.addListener(handlePopupClosed);
      });
    return 'Asked successfully' as const;
  } else {
    return 'Error: There is already a popup' as const;
  }
}

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
  if (msg.type === BGMessageType.CustomClick) {
    console.log('Button Clicked from test app! Responsing now...');
    sendResponse<typeof msg.type>({
      data: 'ok',
    });
  } else if (msg.type === BGMessageType.AskConfirmation) {
    const resp = triggerPopup(msg.question);
    sendResponse<typeof msg.type>({
      data: resp,
    });
  } else {
    // <Warning> Don't use here, or it will capture unrelated messages
  }
};

// Fired when a message is sent from either an extension process or another content script.
chrome.runtime.onMessage.addListener(extMessageHandler);
