import { PageEventType } from 'extension-specific';

export async function triggerCustomEvent(window: Window) {
  const event = new Event(PageEventType.CustomClick);
  window.dispatchEvent(event);
}
