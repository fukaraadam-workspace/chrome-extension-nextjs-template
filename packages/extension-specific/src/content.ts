import { generate } from 'random-words';

console.log('Content script loaded! Generating random words...');
console.log(generate());

// Listener for messages from window/FCL
window.addEventListener('click', function (event) {
  console.log('Page Clicked! Running from content script: ');
  console.log(event);
  chrome.runtime.sendMessage({ ...event, type: 'click' }, (response) => {
    console.log('Response from background script: ');
    console.log(response);
  });
});

export enum MessageType {
  AppUi = 'message-appUi',
  General = 'message-general',
}

type ExtensionRequestMap = {
  [MessageType.AppUi]: {
    data: string;
  };
  [MessageType.General]: {
    data: number;
  };
};

export type ExtensionRequest<T extends MessageType> = {
  type: T;
} & ExtensionRequestMap[T];

type ExtensionResponseMap = {
  [MessageType.AppUi]: { data: 'ok' };
  [MessageType.General]: { data: 'nine' };
};

export type ExtensionResponse<T extends MessageType> = ExtensionResponseMap[T];

function extMessageHandler(
  msg: ExtensionRequest<MessageType>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) {
  if (msg.type === MessageType.AppUi) {
    const response: ExtensionResponse<typeof msg.type> = {
      data: 'ok',
    };
    sendResponse(response);
  }
}

chrome.runtime.onMessage.addListener(extMessageHandler);
