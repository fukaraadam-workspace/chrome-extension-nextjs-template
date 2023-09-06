/**
 * Page Events, consumed by content script.
 */
export enum PageEventType {
  PageClick = 'click',
  CustomClick = 'custom-click',
  AskConfirmation = 'ask-confirmation',
}

type PageRequestMap = {
  [PageEventType.PageClick]: WindowEventMap[PageEventType.PageClick];
  [PageEventType.CustomClick]: Event;
  [PageEventType.AskConfirmation]: CustomEvent<{ question: string }>;
};
export type PageRequest<T extends PageEventType> = PageRequestMap[T];

declare global {
  interface Window {
    //adds definition to Window, but you can do the same with HTMLElement
    addEventListener<K extends PageEventType>(
      type: K,
      listener: (
        this: Window,
        listener: PageRequest<K>,
        options?: boolean | AddEventListenerOptions,
      ) => void,
    ): void;
    dispatchEvent<K extends PageEventType>(ev: PageRequest<K>): boolean;
  }
}

/**
 * Types for communication with content script.
 *
 * <WARNING> MessageType in content and background shouldn't have the same string.
 * Otherwise, the message will be sent to both content and background.
 */
export enum CNMessageType {
  AppUi = 'content-appUi',
  General = 'content-general',
}

type CNRequestMap = {
  [CNMessageType.AppUi]: {
    data: string;
  };
  [CNMessageType.General]: any;
};

export type CNRequest<T extends CNMessageType> = {
  type: T;
} & CNRequestMap[T];

type CNResponseMap = {
  [CNMessageType.AppUi]: { data: 'ok' };
  [CNMessageType.General]: undefined;
};

export type CNResponse<T extends CNMessageType> = CNResponseMap[T];

/**
 * Types for communication with background script.
 *
 * <WARNING> MessageType in content and background shouldn't have the same string.
 * Otherwise, the message will be sent to both content and background.
 */
export enum BGMessageType {
  PageClick = 'background-page-click',
  CustomClick = 'background-custom-click',
  AskConfirmation = 'background-ask-confirmation',
}

type BGRequestMap = {
  [BGMessageType.PageClick]: PageRequestMap[PageEventType.PageClick];
  [BGMessageType.CustomClick]: PageRequestMap[PageEventType.CustomClick];
  [BGMessageType.AskConfirmation]: PageRequestMap[PageEventType.AskConfirmation];
};

export type BGRequest<T extends BGMessageType> = {
  type: T;
} & BGRequestMap[T];

type BGResponseMap = {
  [BGMessageType.PageClick]: undefined;
  [BGMessageType.CustomClick]: { data: 'ok' };
  [BGMessageType.AskConfirmation]: { data: 'accepted' | 'rejected' };
};

export type BGResponse<T extends BGMessageType> = BGResponseMap[T];
