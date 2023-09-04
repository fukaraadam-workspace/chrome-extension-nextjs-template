import type { ExtensionRequest, ExtensionResponse } from '@extension/content';
import { MessageType } from '@extension/content';

export async function sendMessage(data: string) {
  const resp = await sendMessageToExtension({
    type: MessageType.AppUi,
    data,
  });
  return resp;
}

export async function sendMessageToExtension<T extends MessageType>(
  msg: ExtensionRequest<T>,
) {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage<
    ExtensionRequest<T>,
    ExtensionResponse<T>
  >(tabs[0].id!, msg);
  return response;
}
