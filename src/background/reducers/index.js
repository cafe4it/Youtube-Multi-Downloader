import {combineReducers} from 'redux';

import CurrentViewUrl from './current_youtube_url.js';
import CurrentYoutubeInfo from './current_youtube_info.js';
import StreamsByFormat from './get_streams_by_format.js';

const rootReducers = combineReducers({
	videoUrl : CurrentViewUrl,
	videoInfo : CurrentYoutubeInfo,
	streamsByFormat : StreamsByFormat
});

export default rootReducers;