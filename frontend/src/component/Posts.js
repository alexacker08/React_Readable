import React, { Component } from 'react';
import PostPage from './PostPage.js';
import { Route, Link} from 'react-router-dom';

class Post extends Component {

	render(){
		const {title,body,author,category,voteScore,id} = this.props.post
		return (
			<div className="post-content">
				<Link to={`/${category}/${id}`}><h2>{title}</h2></Link>
				<p>{body}</p>
				<p>{author}</p>
				<p>{category}</p>
				<p>{voteScore}</p>
			</div>
		)
	}
}

export default Post