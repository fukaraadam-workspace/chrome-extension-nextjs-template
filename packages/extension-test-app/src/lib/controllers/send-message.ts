import { PageEventType } from 'shared-lib';

export async function triggerCustomEvent(window: Window) {
  const event = new Event(PageEventType.CustomClick);
  window.dispatchEvent(event);
}

export async function triggerConfirmation(window: Window) {
  const event = new Event(PageEventType.AskConfirmation);
  window.dispatchEvent(event);
}
