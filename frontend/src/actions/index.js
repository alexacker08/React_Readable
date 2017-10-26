import {
	fetchAllPosts,
	fetchComments,
	postComment,
	commentVoting,
	postVoting,
} from '../utils/api.js';


export const SHOW_CAT = 'SHOW_ADD';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_UP = 'VOTE_UP';
export const VOTE_DOWN = 'VOTE_DOWN';
export const GET_COMMENTS = 'GET_COMMENT';
export const COMMENT_VOTE_CHANGE = 'COMMENT_VOTE_CHANGE';
export const POST_VOTE_CHANGE = 'POST_VOTE_CHANGE';
export const COMMENT_DOWN = 'COMMENT_DOWN';
export const COMMENT_UP = 'COMMENT_UP';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const FETCHING_POSTS = 'FETCHING_POSTS';
export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';

export function showCats(cat){
	return {
		type: SHOW_CAT,
		cat
	}
}
export function addPost(post){
	return {
		type: ADD_POST,
		post,
		retrieving:false
	}
}
export function editPost(post){
	return {
		type: EDIT_POST,
		post
	}
}
export function deletePost(postId){
	return {
		type: DELETE_POST,
		postId
	}
}
export function postVoteChange(postId,num){
	return {
		type: POST_VOTE_CHANGE,
		postId,
		num
	}
}
export function commentVoteChange(commentId,num){
	return {
		type: COMMENT_VOTE_CHANGE,
		commentId,
		num
	}
}
export function getComments(comment){
	return {
		type: GET_COMMENTS,
		comment,
		retrieving:false
	}
}
export function addComment(comment){
	return {
		type: ADD_COMMENT,
		comment
	}
}
export function editComment(comment){
	return {
		type: EDIT_COMMENT,
		comment
	}
}
export function deleteComment(commentId){
	return {
		type: DELETE_COMMENT,
		commentId
	}
}
export function fetchingPosts(){
	return {
		type: FETCHING_POSTS,
		retrieving:true
	}
}
export function fetchingComments(){
	return {
		type: FETCHING_COMMENTS,
		retrieving:true
	}
}

export function fetchApp(){
	return dispatch => {
		//Dispatch fetching notification for posts
		dispatch(fetchingPosts())
		fetchAllPosts().then((res) => {
			let postKeys = Object.keys(res);
			let postObj = {}
			postKeys.forEach((num) => {
				let postId = res[num].id
				//Send new posts to the reducer and end API fetch notification
				dispatch(addPost(res[num]))
				postObj[postId] = res[num]
			})
			return postObj
		})
		.then((postData) => {
			//Dispatch fetching notification for comments
			dispatch(fetchingComments())
			const arrOfId = Object.keys(postData)
			arrOfId.forEach((id) => {
				fetchComments(id).then((comment) => {
					let commentParse = JSON.parse(comment)
					commentParse.forEach((comment) => {
						//this.props.getComments(comment)
						dispatch(getComments(comment))
					})
				})
			})
		})
		.catch((err) => {
			console.log('fetch err: ' + err.message)
		})
	}
}
export function addingComment(commentObj){
	return dispatch => {
		dispatch(fetchingComments())
		postComment(commentObj).then((res) => {
			if(res.ok){
				dispatch(addComment(commentObj))
			}
		}).catch((err) => {
			console.log('fetch err: ' + err.message)
		})
	}
}
export function commentVote(id,dir){
	return dispatch => {
		commentVoting(id,dir).then((res) => {
			let comObj = JSON.parse(res)
			let newNum = comObj.voteScore
			dispatch(commentVoteChange(id,newNum))
		}).catch((err) => {
			console.log('fetch err: ' + err.message)
		})
	}
}
export function postVote(id,dir){
	return dispatch => {
		postVoting(id,dir).then((res) => {
			let postObj = JSON.parse(res)
			let newNum = postObj.voteScore
			dispatch(postVoteChange(id,newNum))
		}).catch((err) => {
			console.log('fetch err: ' + err.message)
		})
	}
}




