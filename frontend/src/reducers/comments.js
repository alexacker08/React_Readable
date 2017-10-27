import {
	GET_COMMENTS,
	COMMENT_VOTE_CHANGE,
	EDIT_COMMENT,
	ADD_COMMENT,
	DELETE_COMMENT,
	FETCHING_COMMENTS
} from '../actions/types.js'

const commentStore = {
	allComments:{},
	retrieving:false
}

export default function comments(state = commentStore, action){
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