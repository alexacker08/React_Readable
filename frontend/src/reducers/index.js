import {
	SHOW_CAT,
	ADD_POST,
	EDIT_POST,
	DELETE_POST,
	FETCHING_POSTS,
	POST_VOTE_CHANGE,
	GET_COMMENTS,
	EDIT_COMMENT,
	COMMENT_VOTE_CHANGE,
	COMMENT_DOWN,
	COMMENT_UP,
	FETCHING_COMMENTS,
	DELETE_COMMENT,
	ADD_COMMENT
} from './../actions/index.js';
import {combineReducers} from 'redux';

const postStore = {
	posts: {},
	retrieving:false
}
const commentStore = {
	allComments:{},
	retrieving:false
}

function category(state = {}, action){
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
function comments(state = commentStore, action){
	switch(action.type){
		case GET_COMMENTS:
			return {
				...state,
				retrieving:false,
				allComments:{
					...state.allComments,
					[action.comment.id]:action.comment,
					retrieving:action.retrieving
				}
			}
		case COMMENT_VOTE_CHANGE:
			return {
				...state,
				allComments:{
					...state.allComments,
					[action.commentId]:{
						...state.allComments[action.commentId],
						voteScore:action.num
					}
				}
			}
		case DELETE_COMMENT:
			return {
				...state,
				allComments:{
					...state.allComments,
					[action.commentId]:{
						...state.allComments[action.commentId],
						deleted:true
					}
				}
			}
		case ADD_COMMENT:
			return {
				...state,
				allComments: {
					...state.allComments,
					[action.comment.id]:action.comment
				}
			}
		case EDIT_COMMENT:
			return {
				...state,
				allComments:{
					...state.allComments,
					[action.comment.id]:{
						...state.allComments[action.comment.id],
						body:action.comment.body,
						timestamp:action.comment.timestamp,
					}
				}
			}
		case FETCHING_COMMENTS:
			return {
				...state,
				retrieving:true
			}
		default:
			return state
	}
}

function posts(state = postStore, action){
	switch(action.type){
		case ADD_POST:
			return {
				...state,
				retrieving:false,
				posts:{
					...state.posts,
					[action.post.id]:action.post,
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
		case POST_VOTE_CHANGE:
			return {
				...state,
				posts:{
					...state.posts,
					[action.postId]:{
						...state.posts[action.postId],
						voteScore:action.num
					}
				}
			}
		case FETCHING_POSTS:
			return {
				...state,
				retrieving:action.retrieving
			}
		default:
			return state
	}
}

export default combineReducers({
	posts,
	category,
	comments
})
