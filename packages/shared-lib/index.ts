/**
 * Page Events, consumed by content script.
 */
export enum PageEventType {
  PageClick = 'click',
  CustomClick = 'custom-click',
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
  [CNMessageType.General]: {
    [key: string]: any;
  };
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
