import { BGMessageType } from 'shared-lib';
import type {
  BGRequest,
  BGResponseMap,
  AppMessageType,
  AppRequestMap,
} from 'shared-lib';

console.log('Background script loaded!');

/**
 * Popup Handling
 */
let currentPopup: chrome.windows.Window | undefined;

async function triggerPopup<T extends AppMessageType>(
  hostTabId: number,
  request: AppRequestMap[T],
) {
  const handlePopupClosed = (windowId: number) => {
    if (currentPopup && windowId == currentPopup.id) {
      currentPopup = undefined;
    }
  };

  if (!currentPopup) {
    const popupPath = chrome.runtime.getURL(`./popup.html`);
    let popupUrl = new URL(popupPath);
    popupUrl.searchParams.append('hostTabId', hostTabId.toString());
    for (const [key, value] of Object.entries(request)) {
      popupUrl.searchParams.append(key, value);
    }
    const window = await chrome.windows.create({
      url: popupUrl.toString(),
      type: 'popup',
      height: 600,
      width: 400,
      left: 500,
    });
    currentPopup = window;
    chrome.windows.onRemoved.addListener(handlePopupClosed);
    return true;
  } else {
    return false;
  }
}

/**
 * Listener for runtime.onMessage
 *
 * [Content] => BGRequest => [Background] => BGResponse => [Content]
 * [Background] => BGRequest => [AppUI] => BGResponse => [Content]
 */
function extMessageHandler(
  msg: BGRequest,
  sender: chrome.runtime.MessageSender,
  sendResponse: <T extends typeof msg.type>(
    response?: BGResponseMap[T],
  ) => void,
) {
  if (msg.type === BGMessageType.CustomClick) {
    console.log('Button Clicked from test app! Responsing now...');
    sendResponse<typeof msg.type>({
      data: 'ok',
    });
  } else if (msg.type === BGMessageType.AskConfirmation && sender.tab?.id) {
    console.log('Triggered Popup from test app! Responsing now...');
    triggerPopup<typeof msg.type>(sender.tab?.id, msg).then((isPopupOpened) => {
      sendResponse<typeof msg.type>({
        isPopupOpened,
      });
    });

    // <Warning> Return true to indicate you want to send a response asynchronously
    return true;
  } else {
    // <Warning> Don't use here, or it will capture unrelated messages
  }
}

// Fired when a message is sent from either an extension process or another content script.
chrome.runtime.onMessage.addListener(extMessageHandler);
