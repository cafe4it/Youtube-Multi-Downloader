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
        const getInfoUrl = 'https://www.youtube.com/get_video_info?video_id=' + extractVideoID(details.url) + '&el=vevo&el=embedded&asv=3&sts=15902';
        let myWorker = new Worker(chrome.runtime.getURL('shared/worker.js'));
        myWorker.onmessage = function (e) {
            let formats = parseYoutubeVideoInfo(e.data);
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
        console.log(results);
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

let parseYoutubeVideoInfo = function(response) {
	// Splits parameters in a query string.
	function extractParameters(q) {
		var params = q.split('&');
		var result = {};
		for (var i = 0, n = params.length; i < n; i++) {
			var param = params[i];
			var pos = param.indexOf('=');
			if (pos === -1)
				continue;
			var name = param.substring(0, pos);
			var value = param.substring(pos + 1);
			result[name] = decodeURIComponent(value);
		}
		return result;
	}

	var params = extractParameters(response);

	// If the request failed, return an object with an error code
	// and an error message
	if (params.status === 'fail') {
		//
		// Hopefully this error message will be properly localized.
		// Do we need to add any parameters to the XMLHttpRequest to
		// specify the language we want?
		//
		// Note that we include fake type and url properties in the returned
		// object. This is because we still need to trigger the video app's
		// view activity handler to display the error message from youtube,
		// and those parameters are required.
		//
		return {
			status: params.status,
			errorcode: params.errorcode,
			reason: (params.reason || '').replace(/\+/g, ' ')
		};
	}

	// Otherwise, the query was successful
	/*var result = {
		status: params.status
	};*/

	// Now parse the available streams
	//console.log(params);
	var streamsText = params.url_encoded_fmt_stream_map;
	if (!streamsText)
		throw Error('No url_encoded_fmt_stream_map parameter');
	if (params.adaptive_fmts)
		streamsText += ',' + params.adaptive_fmts;
	var streams = streamsText.split(',');
	for (var i = 0, n = streams.length; i < n; i++) {
		streams[i] = extractParameters(streams[i]);
	}

	// This is the list of youtube video formats, ordered from worst
	// (but playable) to best.  These numbers are values used as the
	// itag parameter of each stream description. See
	// https://en.wikipedia.org/wiki/YouTube#Quality_and_codecs
	//
	// XXX
	// Format 18 is H.264, which we can play on the phone, but probably
	// not on desktop. When this code was all in chrome, we used an #ifdef
	// for to enable H.264 for Gonk only. If we still need to do that, then
	// we can modify YoutubeProtocolHandler.js to send an allow_h264 flag
	// along with the url and type and then honor that flag here.
	// The inclusion of H264 might not break b2g desktop anyway; on that
	// platform, viewing youtube seems to launch an external Quicktime
	// viewer or something.
	//

	// Sort the array of stream descriptions in order of format
	// preference, so that the first item is the most preferred one


	// If the best stream is a format we don't support give up.

	let results = streams.map((stream)=>{
		let result = {};
		result.url = stream.url + '&signature=' + (stream.sig || '');
		result.type = stream.type;
		// Strip codec information off of the mime type
		if (result.type && result.type.indexOf(';') !== -1) {
			result.type = result.type.split(';', 1)[0];
		}

		if(stream.itag) result.itag = stream.itag;


		if (params.title) {
			result.title = params.title.replace(/\+/g, ' ');
		}
		if (params.length_seconds) {
			result.duration = params.length_seconds;
		}
		if (params.thumbnail_url) {
			result.poster = params.thumbnail_url;
		}
		return result;
	})

	return results;
}