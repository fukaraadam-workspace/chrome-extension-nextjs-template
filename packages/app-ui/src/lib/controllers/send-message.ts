import { CNMessageType } from 'shared-lib';

export async function sendMessage(data: string) {
  // <ToDo> Add mockup if not in extension mode
  const resp = await sendMessageToExtension(data);
  return resp;
}

async function sendMessageToExtension(data: string) {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return await chrome.tabs.sendMessage<typeof CNMessageType.AppUi>(
    tabs[0].id!,
    {
      type: CNMessageType.AppUi,
      data,
    },
  );
}

export function respondQuestion(window: Window, data: boolean) {
  window.close();
}
