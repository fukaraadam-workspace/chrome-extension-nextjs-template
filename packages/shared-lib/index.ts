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
  [PageEventType.PageClick]: {
    type: typeof PageEventType.PageClick;
  } & Omit<WindowEventMap[typeof PageEventType.PageClick], 'type'>;
  [PageEventType.CustomClick]: {
    type: typeof PageEventType.CustomClick;
  } & Omit<Event, 'type'>;
  [PageEventType.AskConfirmation]: {
    type: typeof PageEventType.AskConfirmation;
  } & Omit<CustomEvent<{ question: string }>, 'type'>;
};
export type PageRequest = PageRequestMap[keyof PageRequestMap];

/**
 * Types for communication with background script.
 * Generally used by content script.
 *
 * <WARNING> MessageType in content and background shouldn't have the same string.
 * Otherwise, the message will be sent to both content and background.
 */
export const BGMessageType = PageEventType;
export type BGMessageType = PageEventType;

type BGRequestMap = PageRequestMap;
export type BGRequest = PageRequest;

export type BGResponseMap = {
  [BGMessageType.PageClick]: undefined;
  [BGMessageType.CustomClick]: { data: 'ok' };
  [BGMessageType.AskConfirmation]: { data: 'accepted' | 'rejected' };
};

// export type BGResponse<K extends BGRequest> = BGResponseMap[K['type']];
export type BGResponse = BGResponseMap[keyof BGResponseMap];

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
export type CNMessageType = (typeof CNMessageType)[keyof typeof CNMessageType];

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

// export type CNResponse<K extends CNRequest> = CNResponseMap[K['type']];
export type CNResponse = CNResponseMap[keyof CNRequestMap];

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
