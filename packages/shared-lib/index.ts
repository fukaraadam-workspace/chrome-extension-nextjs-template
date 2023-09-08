/**
 * Types for communication with Page.
 * Generally consumed by content script to proxy to background script.
 *
 * [Page] => [Content]
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
}

/**
 * Types for communication with Background.
 * Generally used by content script to pass page events.
 *
 * [Content] => [Background]
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
  [BGMessageType.AskConfirmation]: { isPopupOpened: boolean };
};

declare global {
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

/**
 * Types for communication with Content.
 * Generally used by AppUi to communicate with page.
 *
 * [AppUi] => [Content]
 *
 * <WARNING> MessageType in content and background shouldn't have the same string.
 * Otherwise, the message will be sent to both content and background.
 */
export const CNMessageType = {
  AppUi: 'content-appUi',
  Popup: 'content-popup',
} as const;
type CNMessageType = (typeof CNMessageType)[keyof typeof CNMessageType];

type CNRequestMap = {
  [CNMessageType.AppUi]: {
    type: typeof CNMessageType.AppUi;
    data: string;
  };
  [CNMessageType.Popup]: {
    type: typeof CNMessageType.Popup;
    isAccepted: boolean;
  };
};
export type CNRequest = CNRequestMap[keyof CNRequestMap];

export type CNResponseMap = {
  [CNMessageType.AppUi]: { data: 'ok' };
  [CNMessageType.Popup]: undefined;
};

declare global {
  namespace chrome.tabs {
    export function sendMessage<T extends CNMessageType>(
      tabId: number,
      message: CNRequestMap[T],
    ): Promise<CNResponseMap[T]>;
  }
}

/**
 * Types for communication with AppUi.
 * Generally used by background script to pass BGRequest to AppUi as popup.
 *
 * [Background] => [AppUi]
 *
 * <WARNING> MessageType in content and background shouldn't have the same string.
 * Otherwise, the message will be sent to both content and background.
 */
const AppMessageType = {
  AskConfirmation: 'ask-confirmation',
} as const;
export type AppMessageType =
  (typeof AppMessageType)[keyof typeof AppMessageType];

export type AppRequestMap = {
  [AppMessageType.AskConfirmation]: {
    type: typeof AppMessageType.AskConfirmation;
    question: string;
  };
};
export type AppRequest = AppRequestMap[keyof AppRequestMap];
