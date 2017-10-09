import React, { Component } from 'react';
import PostPage from './PostPage.js';
import { connect } from 'react-redux';
import { Route, Link} from 'react-router-dom';

class ShowPosts extends Component {


	componentDidMount(){

	}

	render(){
		const {posts} = this.props
		console.log(posts)
		return (
		  	<div className="container">
		    	<div className="post-container">
		    		{posts.map((post) => {
						return 	<div key={post.id} className="post-content">
									<Link to={`/${post.category}/${post.id}`}><h2>{post.title}</h2></Link>
										<p>{post.body}</p>
										<p>{post.author}</p>
										<p>{post.category}</p>
										<p>{post.voteScore}</p>
								</div>
					})}
		    	</div>
		  	</div>
		)
	}
}

function mapStateToProps(posts,thisProps){
	const {path,params} = thisProps.match
	const paramLength = Object.keys(params).length
	const paramCat = params.category
	const collectedPosts = posts.posts
	//console.log(posts)
	return {
		posts: Object.keys(collectedPosts).filter((key) => {
			if(paramLength > 0){
				if(collectedPosts[key].category === paramCat){
					return key
				}
			} else {
				return key
			}
		}).map((id) => {
			return collectedPosts[id]
		}),
	}
}


export default connect(mapStateToProps)(ShowPosts)