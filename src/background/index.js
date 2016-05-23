/*
 const _AnalyticsCode = 'UA-74453743-1';
 let service, tracker;

 var importScript = (function (oHead) {
 //window.analytics = analytics;
 function loadError(oError) {
 throw new URIError("The script " + oError.target.src + " is not accessible.");
 }

 return function (sSrc, fOnload) {
 var oScript = document.createElement("script");
 oScript.type = "text\/javascript";
 oScript.onerror = loadError;
 if (fOnload) {
 oScript.onload = fOnload;
 }
 oHead.appendChild(oScript);
 oScript.src = sSrc;
 }

 })(document.head || document.getElementsByTagName("head")[0]);

 importScript(chrome.runtime.getURL('shared/google-analytics-bundle.js'), function () {
 console.info('google analytics platform loaded...');
 service = analytics.getService('instagram_easy_downloader');
 tracker = service.getTracker(_AnalyticsCode);
 tracker.sendAppView('App view');
 });
 */


import {createStore} from 'redux';
import rootReducer from './reducers';

import {wrapStore} from 'react-chrome-redux';

import addCurrentVideo from './actions/index.js';

const store = createStore(rootReducer, {}); // a normal Redux store

wrapStore(store, {portName: 'MY_APP'});

chrome.webRequest.onCompleted.addListener((details)=> {
	if(details.type === 'main_frame' || details.type === 'sub_frame'){
		console.log('current : ', details.url);
		store.dispatch(addCurrentVideo(details.url));
	}
}, {urls: ["*://*.youtube.com/watch?v=*","*://*.youtube.com/embed/*"]})