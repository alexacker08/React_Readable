import category from './categories.js'
import posts from './posts.js'
import comments from './comments.js'
import {combineReducers} from 'redux';

export default combineReducers({
	posts,
	category,
	comments
})
