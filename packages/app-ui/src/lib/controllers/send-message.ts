export async function sendMessage(data: string) {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tabs[0].id!, {
    data: data,
    type: 'message-appUi',
  });
  return response;
}
