import React, { Component } from 'react';
import PostPage from './PostPage.js';
import { connect } from 'react-redux';
import { Route, Link} from 'react-router-dom';
import { voteDown,voteUp } from './../actions/index.js';
import {voting} from './../utils/api.js';

class ShowPosts extends Component {

	voteUp(id,num){
		voting(id,'upVote').then((data) => {
			console.log(data)
		}).then(() => {
			this.props.voteUp(id,num)
		})
	}
	voteDown(id,num){
		voting(id,'downVote').then((data) => {
			console.log(data)
		}).then(() => {
			this.props.voteDown(id,num)
		})
	}

	render(){
		const {posts} = this.props
		return (
		  	<div className="container">
		    	<div className="post-container">
		    		{posts.map((post) => {
						return 	<div key={post.id} className="post-content">
									<Link to={`/${post.category}/${post.id}`}><h2>{post.title}</h2></Link>
										<p>Description: {post.body}</p>
										<p>Author: {post.author}</p>
										<p>Category: {post.category}</p>
										<div className="score-area">
											<span onClick={() => this.voteDown(post.id,post.voteScore)}>-</span>
											<p>{post.voteScore}</p>
											<span onClick={() => this.voteUp(post.id,post.voteScore)}>+</span>
										</div>
								</div>
					})}
		    	</div>
		  	</div>
		)
	}
}

function mapStateToProps({posts},thisProps){
	const {path,params} = thisProps.match
	const paramLength = Object.keys(params).length
	const paramCat = params.category
	const collectedPosts = posts.posts

	return {
		posts: Object.keys(collectedPosts).filter((key) => {
			if(typeof paramCat !== 'undefined'){
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
function mapActionsToProps(dispatch){
	return {
		voteUp:(id,num) => dispatch(voteUp(id,num)),
		voteDown:(id,num) => dispatch(voteDown(id,num))
	}
}


export default connect(mapStateToProps,mapActionsToProps)(ShowPosts)