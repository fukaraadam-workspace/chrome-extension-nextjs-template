/**
 * Page Events, consumed by content script.
 * Generally proxied to background script.
 */
export const PageEventType = {
  CustomClick: 'custom-click',
  AskConfirmation: 'ask-confirmation',
} as const;
type PageEventType = (typeof PageEventType)[keyof typeof PageEventType];

type PageRequestMap = {
  [PageEventType.CustomClick]: Event;
  [PageEventType.AskConfirmation]: CustomEvent<{ question: string }>;
};

/**
 * Types for communication with background script.
 * Generally used by content script.
 *
 * <WARNING> MessageType in content and background shouldn't have the same string.
 * Otherwise, the message will be sent to both content and background.
 */
export const BGMessageType = PageEventType;
type BGMessageType = (typeof BGMessageType)[keyof typeof BGMessageType];

type BGRequestMap = {
  [BGMessageType.CustomClick]: {
    type: typeof BGMessageType.CustomClick;
  };
  [BGMessageType.AskConfirmation]: {
    type: typeof BGMessageType.AskConfirmation;
  } & { question: string };
};
export type BGRequest = BGRequestMap[keyof BGRequestMap];

export type BGResponseMap = {
  [BGMessageType.CustomClick]: { data: 'ok' };
  [BGMessageType.AskConfirmation]: { data: string };
};

/**
 * Types for communication with content script.
 * Generally used by AppUi or background script.
 *
 * <WARNING> MessageType in content and background shouldn't have the same string.
 * Otherwise, the message will be sent to both content and background.
 */
export const CNMessageType = {
  AppUi: 'content-appUi',
} as const;
type CNMessageType = (typeof CNMessageType)[keyof typeof CNMessageType];

type CNRequestMap = {
  [CNMessageType.AppUi]: {
    type: typeof CNMessageType.AppUi;
    data: string;
  };
};
export type CNRequest = CNRequestMap[keyof CNRequestMap];

export type CNResponseMap = {
  [CNMessageType.AppUi]: { data: 'ok' };
};

declare global {
  interface Window {
    //adds definition to Window, but you can do the same with HTMLElement
    addEventListener<T extends PageEventType>(
      type: T,
      listener: (
        this: Window,
        listener: PageRequestMap[T],
        options?: boolean | AddEventListenerOptions,
      ) => void,
    ): void;
    dispatchEvent<T extends PageEventType>(ev: PageRequestMap[T]): boolean;
  }

  namespace chrome.tabs {
    export function sendMessage<T extends CNMessageType>(
      tabId: number,
      message: CNRequestMap[T],
    ): Promise<CNResponseMap[T]>;
  }

  namespace chrome.runtime {
    export function sendMessage<T extends BGMessageType>(
      message: BGRequestMap[T],
    ): Promise<BGResponseMap[T]>;
    export function sendMessage<T extends BGMessageType>(
      message: BGRequestMap[T],
      responseCallback: (response: BGResponseMap[T]) => void,
    ): void;
  }
}
