import { SHOW_CAT } from  '../actions/types.js'

export default function category(state = {}, action){
	switch(action.type){
		case SHOW_CAT:
			return {
				...state,
				catType: action.cat
			}
		default:
			return state
	}
}