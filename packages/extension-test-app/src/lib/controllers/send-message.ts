import { PageEventType } from 'shared-lib';

export async function triggerCustomEvent(window: Window) {
  const event = new Event(PageEventType.CustomClick);
  window.dispatchEvent<PageEventType.CustomClick>(event);
}

export async function triggerConfirmation(window: Window) {
  const event = new CustomEvent(PageEventType.AskConfirmation, {
    detail: {
      question: 'Do you confirm?',
    },
  });
  window.dispatchEvent<PageEventType.AskConfirmation>(event);
}
