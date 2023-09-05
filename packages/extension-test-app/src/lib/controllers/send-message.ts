import { PageEventType } from '@extension/content';

export async function triggerCustomEvent(window: Window) {
  const event = new Event(PageEventType.CustomClick);
  window.dispatchEvent(event);
}
