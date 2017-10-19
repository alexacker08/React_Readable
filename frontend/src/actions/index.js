export const SHOW_CAT = 'SHOW_ADD';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_UP = 'VOTE_UP';
export const VOTE_DOWN = 'VOTE_DOWN';
export const GET_COMMENTS = 'GET_COMMENT';
export const COMMENT_UP = 'COMMENT_UP';
export const COMMENT_DOWN = 'COMMENT_DOWN';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const FETCHING_API = 'FETCHING_API';

export function showCats(cat){
	return {
		type: SHOW_CAT,
		cat
	}
}
export function addPost(post){
	return {
		type: ADD_POST,
		post
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
export function voteUp(postId,num){
	return {
		type: VOTE_UP,
		postId,
		num
	}
}
export function voteDown(postId,num){
	return {
		type: VOTE_DOWN,
		postId,
		num
	}
}
export function commentUp(commentId,num){
	return {
		type: COMMENT_UP,
		commentId,
		num
	}
}
export function commentDown(commentId,num){
	return {
		type: COMMENT_DOWN,
		commentId,
		num
	}
}
export function getComments(comment){
	return {
		type: GET_COMMENTS,
		comment
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
export function fetchingApi(status){
	return {
		type: FETCHING_API,
		status,
	}
}

