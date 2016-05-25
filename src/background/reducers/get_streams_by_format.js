export default function(state = null, action = null){
	try{
		switch(action.type){
			case 'GET_STREAMS_BY_FORMAT':
				return action.payload;
				break;
			default:
				return state;
		}
	}catch(ex){
		console.log(ex);
	}
}