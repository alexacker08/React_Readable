import {
	ADD_POST,
	EDIT_POST,
	DELETE_POST,
	POST_VOTE_CHANGE,
	FETCHING_POSTS,
} from '../actions/types.js'

const postStore = {
	posts: {},
	retrieving:false
}

export default function posts(state = postStore, action){
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