const userAuth = 'aacker';
const api = 'http://localhost:3001';

const fetchObj = {
	method: 'GET',
	headers:{
		'Authorization':userAuth,
	}
}

export function grabAllPosts(){
	return fetch(`${api}/posts`, fetchObj)
		.then(res => res.json())
}
export function grabCategories(){
	return fetch(`${api}/categories`, fetchObj)
		.then(res => res.text())
}
export function grabComments(id){
	return fetch(`${api}/posts/${id}/comments`, fetchObj)
		.then(res => res.text())
}