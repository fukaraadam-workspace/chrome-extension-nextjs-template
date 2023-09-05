import type { CNRequest, CNResponse } from 'shared-lib';
import { CNMessageType } from 'shared-lib';

export async function sendMessage(data: string) {
  const resp = await sendMessageToExtension<CNMessageType.AppUi>({
    type: CNMessageType.AppUi,
    data,
  });
  return resp;
}

export async function sendMessageToExtension<T extends CNMessageType>(
  msg: CNRequest<T>,
) {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage<CNRequest<T>, CNResponse<T>>(
    tabs[0].id!,
    msg,
  );
  return response;
}
