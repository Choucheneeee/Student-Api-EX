// background.js (Chrome Extension background script)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "someType") {
      sendResponse({ status: "success", data: "Your Data" });
    }
    return true;  // Keeps the message channel open for async response
  });
  