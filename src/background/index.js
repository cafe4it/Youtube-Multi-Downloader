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
import _ from 'lodash';
import {createStore} from 'redux';
import rootReducer from './reducers';

import {wrapStore} from 'react-chrome-redux';

import addCurrentVideo from './actions/index.js';
import addCurrentVideoInfo from './actions/current_youtube_info_action.js';

import parseYoutubeVideoInfo from '../shared/extractYoutubeToStreams.js';

const store = createStore(rootReducer, {}); // a normal Redux store

wrapStore(store, {portName: 'MY_APP'});

chrome.webRequest.onCompleted.addListener((details)=> {
    const TYPES = ['main_frame', 'sub_frame', 'xmlhttprequest'];
    if (_.some(TYPES, (t)=> t === details.type)) {
        function extractVideoID(url){
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = url.match(regExp);
            if ( match && match[7].length == 11 ){
                return match[7];
            }else{
                return null;
            }
        }
        const getInfoUrl = 'https://www.youtube.com/get_video_info?video_id=' + extractVideoID(details.url) + '&el=vevo&el=embedded&asv=3&sts=15902';
        let myWorker = new Worker(chrome.runtime.getURL('shared/worker.js'));
        myWorker.onmessage = function (e) {
            let obj = parseYoutubeVideoInfo(e.data);
	        console.log(obj);
	        store.dispatch(addCurrentVideoInfo(obj));
        }
        myWorker.postMessage({url : getInfoUrl});
    }
}, {urls: ["*://*.youtube.com/watch?v=*", "*://*.youtube.com/embed/*"]})

