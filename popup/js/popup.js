// When you click the popup icon, the following messages get sent to background.js.

var popupPort = chrome.runtime.connect({ name: "popupPort" });

popupPort.postMessage({ method: "getPlayers" });