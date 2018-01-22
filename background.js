// GLOBAL VARIABLES
var audio = null;
var activeTabID = null;
var on = false;
var request_tracker = {};

// ### ENABLE REQUEST AUDIO ### //
//chrome.browserAction.onClicked.addListener(function() {
chrome.browserAction.onClicked(function() {
	on = !on;
	if(!on){
		console.log('stop!')
		/*
		Object.keys(audio.tones).map(function(methods, index) {
			audio.tones[methods].stopTone();
		});
		*/
		audio.stopAllTones();
		onRemoved_callback();
		onoff = 0;
		return;
	}
	console.log('start!')

	chrome.webRequest.onBeforeRequest.addListener(
		onBeforeRequest_callback,
		{urls: ["<all_urls>"]},
		["blocking", "requestBody"]
	);

	chrome.webRequest.onBeforeSendHeaders.addListener(
		onBeforeSendHeaders_callback,
		{urls: ["<all_urls>"]},
		["blocking", "requestHeaders"]
	);

	chrome.webRequest.onHeadersReceived.addListener(
		onHeadersReceived_callback,
		{urls: ["<all_urls>"]},
		["blocking", "responseHeaders"]
	);

	chrome.webRequest.onCompleted.addListener(
		onCompleted_callback,
		{urls: ["<all_urls>"]},
		["responseHeaders"]
	);

	chrome.webRequest.onErrorOccurred.addListener(
		onErrorOccurred_callback,
		{urls: ["<all_urls>"]}
	);

	chrome.tabs.onActivated.addListener( 
		onActivated_callback
	);
	
	return {};
});

// ### AUDIO GENERATOR ### //
audio = new Audio();

// ### WEB REQUEST CALLBACKS
var onBeforeRequest_callback = function(details) {
	console.log(details)
	if(activeTabID === details.tabId){
		if(!(details.requestId in request_tracker)){
			request_tracker[details.requestId] = 1;
			audio.tones[details.method].startTone();
		}
	}
	return {};
},
onBeforeSendHeaders_callback = function(details) {
	console.log(details)
	return {};
},
onHeadersReceived_callback = function(details) {
	console.log(details)
	return {};
},
onCompleted_callback = function(details) {
	console.log(details)
	if(activeTabID === details.tabId){
		if(details.requestId in request_tracker){
			request_tracker[details.requestId] = 0;
			delete request_tracker[details.requestId]; 
			audio.tones[details.method].stopTone();
		}
	}
	return {};
},
onErrorOccurred_callback = function(details) {
	console.log(details)
	if(activeTabID === details.tabId){
		if(details.requestId in request_tracker){
			request_tracker[details.requestId] = 0;
			delete request_tracker[details.requestId]; 
			audio.tones[details.method].stopTone();
		}
	}
	audio.tones['ERROR'].startTone();
	setTimeout(audio.tones['ERROR'].stopTone(), 1000);
	return {};
}

// ### TAB ACTIVATED CALLBACK ### //
var onActivated_callback = function(info) {
	console.log(info)
	audio.stopAllTones();
	activeTabID = info.tabId;
}

// ### DISABLE CALLBACK ### //
var onRemoved_callback = function() {
	chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequest_callback);
	chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeaders_callback);
	chrome.webRequest.onHeadersReceived.removeListener(onHeadersReceived_callback);
	chrome.webRequest.onCompleted.removeListener(onCompleted_callback);
	chrome.webRequest.onErrorOccurred.removeListener(onErrorOccurred_callback);
	chrome.tabs.onActivated.removeListener(onActivated_callback);
};

// ### AUDIO OBJECT ### //
function Audio(){
	// AUDIO

	var context = new AudioContext();

	// OSCILLATOR AND GAIN
	var VCO_VCA = function(method){
		
		// FREQUENCY TONES FOR WEB REQUESTS
		var tones = {
			'GET': 261.6,
			'POST': 293.7,
			'PUT': 329.6,
			'HEAD' :370.0,
			'DELETE': 415.3,
			'PATCH': 466.2,
			'OPTIONS': 523.3,
			'ERROR': 2093.0
		};

		var tone = tones[method];

		/* VCO */
		var vco = context.createOscillator();
		vco.type = vco.SINE;
		vco.frequency.value = tone;
		vco.start(0);

		/* VCA */
		this.vca = context.createGain();
		this.vca.gain.value = 0;

		/* Connections */
		vco.connect(this.vca);
		this.vca.connect(context.destination);

		this.startTone = function(){
			this.vca.gain.value = 1;
		}
		this.stopTone = function(){
			this.vca.gain.value = 0;
		}
	}

	// OSCILLATOR/GAINS FOR EACH WEB REQUEST
	this.tones = {
		'GET': new VCO_VCA('GET'),
		'POST': new VCO_VCA('POST'),
		'PUT': new VCO_VCA('PUT'),
		'HEAD': new VCO_VCA('HEAD'),
		'DELETE': new VCO_VCA('DELETE'),
		'PATCH': new VCO_VCA('PATCH'),
		'OPTIONS': new VCO_VCA('OPTIONS'),
		'ERROR': new VCO_VCA('ERROR')
	};

	// Stop All Tones
	this.stopAllTones = function(){
		var that = this;
		Object.keys(that.tones).map(function(methods, index) {
			that.tones[methods].stopTone();
		});
	}

}