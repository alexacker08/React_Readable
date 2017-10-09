export const SHOW_CAT = 'SHOW_ADD';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_UP = 'VOTE_CHANGE';
export const VOTE_DOWN = 'VOTE_CHANGE';
export const GET_COMMENTS = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

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
export function editPost(postId){
	return {
		type: EDIT_POST,
		postId
	}
}
export function deletePost(postId){
	return {
		type: DELETE_POST,
		postId
	}
}
export function voteUp(postId){
	return {
		type: VOTE_UP,
		postId
	}
}
export function voteDown(postId){
	return {
		type: VOTE_DOWN,
		postId
	}
}
export function getComments(comment){
	return {
		type: GET_COMMENTS,
		comment
	}
}
export function editComment({commentId}){
	return {
		type: EDIT_COMMENT,
		commentId
	}
}
