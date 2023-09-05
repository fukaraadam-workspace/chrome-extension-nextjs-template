import { PageEventType } from 'shared-lib';

export async function triggerCustomEvent(window: Window) {
  const event = new Event(PageEventType.CustomClick);
  window.dispatchEvent(event);
}
