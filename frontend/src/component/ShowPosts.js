import React, { Component } from 'react';
import PostPage from './PostPage.js';
import { connect } from 'react-redux';
import { Route, Link} from 'react-router-dom';
import {voteDown,voteUp,editPost,deletePost,addPost} from './../actions/index.js';
import {voting,fetchDeletePost,fetchAddPost,fetchEditPost} from './../utils/api.js';
import Modal from 'react-modal';
import {Callout,Colors,Button} from 'react-foundation';
import uuid4 from 'uuid';
import Timestamp from 'react-timestamp';

class ShowPosts extends Component {

	constructor(props){
		super()
		this.state = {
			postModalOpen:false,
			postModalTitle:'',
			postModalBody:'',
			postModalAuth:'',
			postModalCat:'Select your category',
			postModalId:'',
			postModalType:null,
			filterOption:'likes',
		}
		this.openPostModal.bind(this)
		this.closePostModal.bind(this)
		this.deletePost.bind(this)
		this.changeFilter.bind(this)
	}

	voteUp(id,num){
		voting(id,'upVote').then((data) => {

		}).then(() => {
			this.props.voteUp(id,num)
		})
	}
	voteDown(id,num){
		voting(id,'downVote').then((data) => {

		}).then(() => {
			this.props.voteDown(id,num)
		})
	}
	openPostModal(type,post){
		if(type === 'edit'){
			this.setState(() => ({
				postModalOpen:true,
				postModalType:type,
				postModalTitle:post.title,
				postModalBody:post.body,
				postModalId:post.id,
			}))
		} else if(type === 'add'){
			this.setState(() => ({
				postModalOpen:true,
				postModalType:type,
			}))
		}
	}
	closePostModal(){
		this.setState(() => ({
			postModalOpen:false,
			postModalType:null,
			postModalTitle:'',
			postModalBody:'',
			postModalId:'',
			postModalAuth:'',
			postModalCat:'Select your category'
		}))
	}
	postInputChange(e){
		const postName = e.target.name
		console.log(e.target.value)
		if(postName === 'post_title'){
			this.setState({postModalTitle:e.target.value})
		} else if(postName === 'post_body'){
			this.setState({postModalBody:e.target.value})
		} else if(postName === 'post_author' && this.state.postModalType !== 'edit'){
			this.setState({postModalAuth:e.target.value})
		} else if(postName === 'post_cat'){
			this.setState({postModalCat:e.target.value})
		}
	}
	changeFilter(e){
		this.setState({filterOption:e.target.value})
	}
	//POST ACTIONS
	deletePost(id){
		fetchDeletePost(id).then((res) => {
			if(res.ok){
				this.props.deletePost(id)
			}
		})
	}
	//SUBMIT POST
	submitPost(){
		const stamp = Date.now()
		if(this.state.postModalType === 'add'){
			const uuid = uuid4();
			const newPost = {
				id:uuid,
				timestamp:stamp,
				title:this.state.postModalTitle,
				body:this.state.postModalBody,
				author:this.state.postModalAuth,
				category:this.state.postModalCat.toLowerCase(),
				voteScore:1,
				deleted:false,
			}
			fetchAddPost(newPost).then((res) => {
				if(res.ok){
					this.props.addPost(newPost)
				}
			})
		} else if(this.state.postModalType === 'edit'){
			const editPost = {
				id:this.state.postModalId,
				title:this.state.postModalTitle,
				body:this.state.postModalBody
			}
			fetchEditPost(editPost).then((res) => {
				if(res.ok){
					this.props.editPost(editPost)
				}
			})
		}
		this.closePostModal()
	}

	render(){
		const {posts} = this.props
		const modalType = this.state.postModalType === 'edit' ? 'hide' : 'active';
		return (
		  	<div className="container">
		    	<div className="post-container">
		    		<div className="row">
		    			<div className="columns medium-6">
			    			<Button className="primary-btn" onClick={() => this.openPostModal('add')}>Add Post</Button>
			    		</div>
			    		<div className="columns medium-6">
				    		<div className="post-filter">
				    			<select value={this.state.filterOption} onChange={(e) => this.changeFilter(e)}>
				    				<option value="likes">Number of Likes</option>
				    				<option value="comments">Number of Comments</option>
				    			</select>
				    		</div>
			    		</div>
		    		</div>
		    		{
		    			posts.sort((postFirst,postSecond) => {
		    				if(this.state.filterOption === 'likes'){
		    					return postSecond.voteScore - postFirst.voteScore
		    				} else {
		    					return postSecond.numComments - postFirst.numComments
		    				}
		    			}).map((post) => {
		    				return <div key={post.id} className="post-content">
									<div className="num-comments"><span>{post.numComments}</span></div>
									<div className="row">
										<div className="columns medium-6">
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
										<div className="columns medium-6">
											<div className="line-buttons">
												<button onClick={() => this.openPostModal('edit',post)}>Edit</button>
												<button onClick={() => this.deletePost(post.id)}>Delete</button>
											</div>
										</div>
									</div>
								</div>
		    			})
		    		}
		    	</div>
				<Modal
					isOpen={this.state.postModalOpen}
					className="modal-design posts"
					overlayClassName="modal-overlay"
					contentLabel="post-edit-modal"
				>
					<h3>Edit this Post</h3>
					<div onClick={() => this.closePostModal()} className="x-button">X</div>
					<form onSubmit={() => this.submitPost()}>
						<fieldset>
							<label>Title</label>
							<input type="text" name="post_title" onChange={(e) => this.postInputChange(e)} value={this.state.postModalTitle} />
							<label>Body</label>
							<input type="text" name="post_body" onChange={(e) => this.postInputChange(e)} value={this.state.postModalBody} />
							<div className={modalType}>
								<label>Author</label>
								<input type="text" name="post_author" onChange={(e) => this.postInputChange(e)} value={this.state.postModalAuth} />
								<label>Categories</label>
								<select value={this.state.postModalCat} onChange={(e) => this.postInputChange(e)} name="post_cat">
									<option value='' disabled>Select your category</option>
									<option value="React">React</option>
									<option value="Redux">Redux</option>
									<option value="Udacity">Udacity</option>
								</select>
							</div>
						</fieldset>
						<Button className="secondary-btn">Submit</Button>
					</form>
				</Modal>
		  	</div>
		)
	}
}

function mapStateToProps({posts},thisProps){
	const {path,params} = thisProps.match
	const paramLength = Object.keys(params).length
	const paramCat = params.category
	const collectedPosts = posts.posts
	const collectedComments = posts.comments
	return {
		posts: Object.keys(collectedPosts).filter((key) => {
			if(typeof paramCat !== 'undefined'){
				if(collectedPosts[key].category === paramCat && !collectedPosts[key].deleted){
					return key
				}
			} else if(!collectedPosts[key].deleted){
				return key
			}
		}).map((id) => {
			let indvPost = collectedPosts[id]
			let commentKeys = Object.keys(collectedComments)
			let num = 0;
			commentKeys.forEach((key) => {
				if(collectedComments[key].parentId === id){
					num++
				}
			})
			indvPost.numComments = num
			return indvPost
		}),
	}
}
function mapActionsToProps(dispatch){
	return {
		voteUp:(id,num) => dispatch(voteUp(id,num)),
		voteDown:(id,num) => dispatch(voteDown(id,num)),
		deletePost:(id) => dispatch(deletePost(id)),
		addPost:(post) => dispatch(addPost(post)),
		editPost:(post) => dispatch(editPost(post)),
	}
}


export default connect(mapStateToProps,mapActionsToProps)(ShowPosts)