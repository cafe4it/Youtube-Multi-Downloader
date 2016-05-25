export default function(state = null, action = null){
	switch(action.type){
		case 'CURRENT_YOUTUBE_INFO':
			return action.payload;
			break;
		default:
			return state;
	}
}