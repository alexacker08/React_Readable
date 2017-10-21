const userAuth = 'aacker';
const api = 'http://localhost:3001';

const fetchObj = {
	method: 'GET',
	headers:{
		'Authorization':userAuth,
	}
}

export function fetchAllPosts(){
	return fetch(`${api}/posts`, fetchObj)
		.then(res => res.json())
}
export function fetchCategories(){
	return fetch(`${api}/categories`, fetchObj)
		.then(res => res.text())
}
export function fetchComments(id){
	return fetch(`${api}/posts/${id}/comments`, fetchObj)
		.then(res => res.text())
}
export function voting(id,voteType){
	return fetch(`${api}/posts/${id}`,{
		method:'POST',
		headers:{
			'Authorization':userAuth,
			'Content-Type':'application/json',
		},
		body: JSON.stringify({
			option:voteType
		})
	}).then(res => res.text())
}
export function commentVoting(id,voteType){
	return fetch(`${api}/comments/${id}`,{
		method:'POST',
		headers:{
			'Authorization':userAuth,
			'Content-Type':'application/json',
		},
		body:JSON.stringify({
			option:voteType
		})
	})
}
export function postComment({id,timestamp,body,author,parentId}){
	return fetch(`${api}/comments`,{
		method:'POST',
		headers:{
			'Authorization':userAuth,
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			id,
			timestamp,
			body,
			author,
			parentId,
		})
	})
}
export function fetchEditComment({id,timestamp,body}){
	return fetch(`${api}/comments/${id}`,{
		method :'PUT',
		headers:{
			'Authorization':userAuth,
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			timestamp,
			body,
		})
	})
}

export function fetchDeleteComment(id){
	return fetch(`${api}/comments/${id}`,{
		method:'DELETE',
		headers:{
			'Authorization':userAuth,
			'Content-Type':'application/json'
		}
	})
}
export function fetchDeletePost(id){
	return fetch(`${api}/posts/${id}`,{
		method:'DELETE',
		headers:{
			'Authorization':userAuth,
			'Content-Type':'application/json'
		}
	})
}
export function fetchAddPost({id,timestamp,title,body,author,category}){
	return fetch(`${api}/posts`,{
		method:'POST',
		headers:{
			'Authorization':userAuth,
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			id,
			timestamp,
			title,
			body,
			author,
			category,
		})
	})
}
export function fetchEditPost({id,title,body}){
	return fetch(`${api}/posts/${id}`,{
		method:'PUT',
		headers:{
			'Authorization':userAuth,
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			title,
			body,
		})
	})
}


