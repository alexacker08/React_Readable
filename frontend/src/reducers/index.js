import {
	SHOW_CAT,
	ADD_POST,
	EDIT_POST,
	DELETE_POST,
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

const store = {
	categories: {},
	posts: {},
	comments:{},
	fetchingAPI:false,
}

function posts(state = store, action){
	switch(action.type){
		case ADD_POST:
			return {
				...state,
				posts:{
					...state.posts,
					[action.post.id]:action.post
				}
			}
		case SHOW_CAT:
			return {
				...state,
				categories: action.cat
			}
		case GET_COMMENTS:
			return {
				...state,
				comments:{
					...state.comments,
					[action.comment.id]:action.comment
				}
			}
		case DELETE_POST:
			return {
				...state,
				posts:{
					...state.posts,
					[action.postId]:{
						...state.posts[action.postId],
						deleted:true
					}
				}
			}
		case EDIT_POST:
			return {
				...state,
				posts:{
					...state.posts,
					[action.post.id]:{
						...state.posts[action.post.id],
						body:action.post.body,
						title:action.post.title
					}
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
		case EDIT_COMMENT:
			return {
				...state,
				comments:{
					...state.comments,
					[action.comment.id]:{
						...state.comments[action.comment.id],
						body:action.comment.body,
						timestamp:action.comment.timestamp,
					}
				}
			}
	}
	return state;
}

export default combineReducers({
	posts
})
