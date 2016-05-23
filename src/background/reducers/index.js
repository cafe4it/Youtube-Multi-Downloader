import {combineReducers} from 'redux';

import CurrentViewUrl from './current_youtube_url.js';

const rootReducers = combineReducers({
	currentUrl : CurrentViewUrl
});

export default rootReducers;