import { generate } from 'random-words';

console.log('Background script loaded! Generating random words...');
console.log(generate());

/**
 * Listener for runtime.onMessage
 * Generally used by content script
 */

// <WARNING> MessageType in content and background shouldn't have the same string.
// Otherwise, the message will be sent to both content and background.
export enum BGMessageType {
  PageClick = 'background-page-click',
  CustomClick = 'background-custom-click',
}

type BGRequestMap = {
  [BGMessageType.PageClick]: {
    data: string;
  };
  [BGMessageType.CustomClick]: {
    [key: string]: any;
  };
};

export type BGRequest<T extends BGMessageType> = {
  type: T;
} & BGRequestMap[T];

type BGResponseMap = {
  [BGMessageType.PageClick]: { data: 'ok' };
  [BGMessageType.CustomClick]: undefined;
};

export type BGResponse<T extends BGMessageType> = BGResponseMap[T];

const extMessageHandler = (
  msg: BGRequest<BGMessageType>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) => {
  if (msg.type === BGMessageType.PageClick) {
    console.log('Page Clicked! Running from background script: ');
    console.log('Send from tab with url: ', sender.tab?.url);
    const response: BGResponse<typeof msg.type> = {
      data: 'ok',
    };
    sendResponse(response);
  } else {
    console.log('--General message recieved--');
    console.log(msg);
    console.log('Send from tab with url: ', sender.tab?.url);
    const response: BGResponse<typeof msg.type> = undefined;
  }
};

// Fired when a message is sent from either an extension process or another content script.
chrome.runtime.onMessage.addListener(extMessageHandler);
