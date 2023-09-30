chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "request_recording") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs ,activeTab) {
            // Inject the content script when the "start_video" message is received
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id, allFrames: true},
                files: ["./content.js"]
                
            }, function () {
                console.log("Content script injected");
                
            });
        });
        sendResponse({ message: "Starting video..." });
    }
});
