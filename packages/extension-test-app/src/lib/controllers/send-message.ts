import { PageEventType } from 'shared-lib';

export async function triggerCustomEvent(window: Window) {
  const event = new Event(PageEventType.CustomClick);
  window.dispatchEvent<typeof PageEventType.CustomClick>({
    ...event,
    type: PageEventType.CustomClick,
  });
}

export async function triggerConfirmation(window: Window) {
  const event = new CustomEvent(PageEventType.AskConfirmation, {
    detail: {
      question: 'Do you confirm?',
    },
  });
  window.dispatchEvent<typeof PageEventType.AskConfirmation>({
    ...event,
    type: PageEventType.AskConfirmation,
  });
}
