import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {voteDown,voteUp,editPost,deletePost,addPost,postVote} from './../actions/index.js';
import {fetchDeletePost,fetchAddPost,fetchEditPost} from './../utils/api.js';
import Modal from 'react-modal';
import {Button} from 'react-foundation';
import uuid4 from 'uuid';

class ShowPosts extends Component {

	constructor(props){
		super()
		this.state = {
			postModalOpen:false,
			postModalHeader:'',
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
	openPostModal(type,post){
		if(type === 'edit'){
			this.setState(() => ({
				postModalOpen:true,
				postModalHeader:'Edit this post',
				postModalType:type,
				postModalTitle:post.title,
				postModalBody:post.body,
				postModalId:post.id,
			}))
		} else if(type === 'add'){
			this.setState(() => ({
				postModalOpen:true,
				postModalType:type,
				postModalHeader:'Add a new post'
			}))
		}
	}
	closePostModal(){
		this.setState(() => ({
			postModalOpen:false,
			postModalType:null,
			postModalHeader:'',
			postModalTitle:'',
			postModalBody:'',
			postModalId:'',
			postModalAuth:'',
			postModalCat:'Select your category'
		}))
	}
	postInputChange(e){
		const postName = e.target.name
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
			//Builds a new Post to send to the API and the Store
			const newPost = {
				id:uuid,
				timestamp:stamp,
				title:this.state.postModalTitle,
				body:this.state.postModalBody,
				author:this.state.postModalAuth,
				category:this.state.postModalCat.toLowerCase(),
				voteScore:1,
				numComments:0,
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
	updateTime(unix){
		const date = new Date(unix)
		const monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
		const day = date.getDate()
		const month = monthArr[date.getMonth()]
		const year = date.getFullYear()
		const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
		const minute = date.getMinutes() < 10 ? date.getMinutes().toString().split('').concat('0').reverse().join('') : date.getMinutes()
		const ampm = date.getHours() > 11 ? 'PM' : 'AM'
		return `${hour}:${minute} ${ampm} - ${day} ${month} ${year}`
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
				    				<option value="time">Time posted</option>
				    			</select>
				    		</div>
			    		</div>
		    		</div>
		    		{
		    			posts.sort((postFirst,postSecond) => {
		    				if(this.state.filterOption === 'likes'){
		    					return postSecond.voteScore - postFirst.voteScore
		    				} else if(this.state.filterOption === 'comments') {
		    					return postSecond.numComments - postFirst.numComments
		    				} else if(this.state.filterOption === 'time'){
		    					return postSecond.timestamp - postFirst.timestamp
		    				}
		    			}).map((post) => {
		    				return <div key={post.id} className="post-content">
									<div className="num-comments"><span>{post.numComments}</span></div>
									<div className="row">
										<div className="columns medium-6">
											<Link to={`/${post.category}/${post.id}`}><h2>{post.title}</h2></Link>
											<p>Post by: {post.author}</p>
											<div className={post.category}></div>
											<p>{this.updateTime(post.timestamp)}</p>
											<div className="score-area">
												<span className="thumb-down" onClick={() => this.props.dispatch(postVote(post.id,'downVote'))}></span>
												<p>{post.voteScore}</p>
												<span className="thumb-up" onClick={() => this.props.dispatch(postVote(post.id,'upVote'))}></span>
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
					<h3>{this.state.postModalHeader}</h3>
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

function mapStateToProps({posts,comments},thisProps){
	const {params} = thisProps.match
	const paramCat = params.category
	const collectedPosts = posts.posts || []
	const collectedComments = comments.allComments || []
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
				let indvComment = collectedComments[key]
				if(indvComment.parentId === id && !indvComment.deleted){
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
		deletePost:(id) => dispatch(deletePost(id)),
		addPost:(post) => dispatch(addPost(post)),
		editPost:(post) => dispatch(editPost(post)),
		dispatch:dispatch
	}
}


export default connect(mapStateToProps,mapActionsToProps)(ShowPosts)