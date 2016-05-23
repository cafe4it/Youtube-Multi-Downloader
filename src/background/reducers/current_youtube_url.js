export default function(state = null, action = null){
	switch(action.type){
		case 'ADD_CURRENT_VIDEO':
			return action.payload;
			break;
		default:
			return state;
	}
}