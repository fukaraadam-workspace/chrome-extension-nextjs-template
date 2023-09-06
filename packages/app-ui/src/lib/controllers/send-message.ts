import { CNMessageType } from 'shared-lib';

export async function sendMessage(data: string) {
  // <ToDo> Add mockup if not in extension mode
  const resp = await sendMessageToExtension(data);
  return resp;
}

export async function sendMessageToExtension(data: string) {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return await chrome.tabs.sendMessage(tabs[0].id!, {
    type: CNMessageType.AppUi,
    data,
  });
}
