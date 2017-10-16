import {
	SHOW_CAT,
	ADD_POST,
	EDIT_POST,
	VOTE_UP,
	VOTE_DOWN,
	GET_COMMENTS,
	EDIT_COMMENT,
	COMMENT_UP,
	COMMENT_DOWN,
	FETCHING_API,
	DELETE_COMMENT,
	ADD_COMMENT
} from './../actions/index.js';
import {combineReducers} from 'redux';

const tempState = {
	categories: {},
	posts: {},
	postEdit:{},
	comments:{},
	commentEdit:{},
	fetchingAPI:false,
	testComment:{}
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
			return {
				...state,
				comments:{
					...state.comments,
					[action.comment.id]:action.comment
				}
			}
		case VOTE_UP:
			return {
				...state,
				posts:{
					...state.posts,
					[action.postId]:{
						...state.posts[action.postId],
						voteScore:action.num + 1
					}
				}
			}
		case VOTE_DOWN:
			return {
				...state,
				posts:{
					...state.posts,
					[action.postId]:{
						...state.posts[action.postId],
						voteScore:action.num - 1
					}
				}
			}
		case COMMENT_UP:
			return {
				...state,
				comments:{
					...state.comments,
					[action.commentId]:{
						...state.comments[action.commentId],
						voteScore:action.num + 1
					}
				}
			}
		case COMMENT_DOWN:
			return {
				...state,
				comments:{
					...state.comments,
					[action.commentId]:{
						...state.comments[action.commentId],
						voteScore:action.num - 1
					}
				}
			}
		case FETCHING_API:
			return {
				...state,
				fetchingAPI:action.status
			}
		case DELETE_COMMENT:
			return {
				...state,
				comments:{
					...state.comments,
					[action.commentId]:{
						...state.comments[action.commentId],
						deleted:true
					}
				}
			}
		case ADD_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.comment.id]:action.comment
				}
			}
	}
	return state;
}

export default combineReducers({
	posts
})
