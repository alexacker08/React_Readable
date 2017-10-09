import {
	SHOW_CAT,
	ADD_POST,
	EDIT_POST,
	VOTE_UP,
	VOTE_DOWN,
	GET_COMMENTS,
	EDIT_COMMENT,
} from './../actions/index.js';

const tempState = {
	categories: {},
	posts: {},
	comments:{},
}


function posts(state = tempState, action){
	switch(action.type){
		case ADD_POST:
			return Object.assign({}, state, {
				posts: action.post
			})
		case SHOW_CAT:
			return Object.assign({}, state, {
				categories: action.cat
			})
		case GET_COMMENTS:
			return Object.assign({}, state, {
				comments: action.comment
			})

	}
	return state;
}

export default posts