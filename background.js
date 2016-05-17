chrome.runtime.onConnect.addListener(function(port){

	port.onMessage.addListener(function(message) {

	    if (message.method == 'getPlayers' && port.name == 'popupPort') {

			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			
			    var activeTab = tabs[0];
			    
				var contentPort = chrome.tabs.connect(activeTab.id, {name: 'contentPort'});

    			contentPort.postMessage({ method: 'getPlayers' });
			});
	    }
	});
});