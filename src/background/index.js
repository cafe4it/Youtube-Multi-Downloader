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
        const getInfoUrl = 'https://www.youtube.com/get_video_info?video_id=' + extractVideoID(details.url);
        let myWorker = new Worker(chrome.runtime.getURL('shared/worker.js'));
        myWorker.onmessage = function (e) {
            let formats = parseYoutubeInfoStringToFormats(e.data);
            console.info(formats);
        }
        myWorker.postMessage({url : getInfoUrl});

        store.dispatch(addCurrentVideo(details.url));
    }
}, {urls: ["*://*.youtube.com/watch?v=*", "*://*.youtube.com/embed/*"]})

let parseYoutubeInfoStringToFormats = function(youtubeInfoString) {
    var element, formatInfoArray, formatInfoElement, formatInfoElementPair, formatInfoMap, formatStreamArray, formatStreamArrayString, formatStreamString, formats, i, j, len, len1, youtubeInfoArray;
    youtubeInfoArray = youtubeInfoString.split('&');
    if (youtubeInfoArray[0] === 'status=fail') {
        return null;
    }
    formatStreamArrayString = ((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = youtubeInfoArray.length; i < len; i++) {
            element = youtubeInfoArray[i];
            if (element.split('=')[0] === 'url_encoded_fmt_stream_map') {
                results.push(element);
            }
        }
        return results;
    })())[0].split('=')[1];
    formatStreamArray = decodeURIComponent(formatStreamArrayString).split(',');
    formats = [];
    for (i = 0, len = formatStreamArray.length; i < len; i++) {
        formatStreamString = formatStreamArray[i];
        formatInfoArray = formatStreamString.split('&');
        formatInfoMap = {};
        for (j = 0, len1 = formatInfoArray.length; j < len1; j++) {
            formatInfoElement = formatInfoArray[j];
            formatInfoElementPair = formatInfoElement.split('=');
            formatInfoMap[formatInfoElementPair[0]] = decodeURIComponent(formatInfoElementPair[1]);
        }
        formats.push(formatInfoMap);
    }
    return formats;
};