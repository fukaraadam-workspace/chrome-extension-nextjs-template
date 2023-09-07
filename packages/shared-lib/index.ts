/**
 * Page Events, consumed by content script.
 * Generally proxied to background script.
 */
export const PageEventType = {
  PageClick: 'click',
  CustomClick: 'custom-click',
  AskConfirmation: 'ask-confirmation',
} as const;
type PageEventType = (typeof PageEventType)[keyof typeof PageEventType];

type PageRequestMap = {
  [PageEventType.PageClick]: WindowEventMap[typeof PageEventType.PageClick];
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
type BGRequestMap = {
  [BGMessageType.PageClick]: PageRequestMap[typeof BGMessageType.PageClick] & {
    type: typeof BGMessageType.PageClick;
  };
  [BGMessageType.CustomClick]: PageRequestMap[typeof BGMessageType.CustomClick] & {
    type: typeof BGMessageType.CustomClick;
  };
  [BGMessageType.AskConfirmation]: PageRequestMap[typeof BGMessageType.AskConfirmation] & {
    type: typeof BGMessageType.AskConfirmation;
  };
};
export type BGRequest = BGRequestMap[keyof BGRequestMap];
export type BGResponseMap = {
  [BGMessageType.PageClick]: undefined;
  [BGMessageType.CustomClick]: { data: 'ok' };
  [BGMessageType.AskConfirmation]: { data: 'accepted' | 'rejected' };
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
  General: 'content-general',
} as const;

type CNRequestMap = {
  [CNMessageType.AppUi]: {
    type: typeof CNMessageType.AppUi;
    data: string;
  };
  [CNMessageType.General]: {
    type: typeof CNMessageType.General;
    [key: string]: any;
  };
};
export type CNRequest = CNRequestMap[keyof CNRequestMap];

export type CNResponseMap = {
  [CNMessageType.AppUi]: { data: 'ok' };
  [CNMessageType.General]: undefined;
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
    export function sendMessage<K extends CNRequest>(
      tabId: number,
      message: K,
    ): Promise<CNResponseMap[K['type']]>;
  }

  namespace chrome.runtime {
    export function sendMessage<K extends BGRequest>(
      message: K,
    ): Promise<BGResponseMap[K['type']]>;
    export function sendMessage<K extends BGRequest>(
      message: K,
      responseCallback: (response: BGResponseMap[K['type']]) => void,
    ): void;
  }
}
