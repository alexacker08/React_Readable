import React, {Component} from 'react';
import { connect } from 'react-redux';
import { voteDown,voteUp,commentUp,commentDown,fetchingApi,deleteComment,addComment,editComment,editPost,deletePost} from './../actions/index.js';
import {commentVoting,voting,postComment,fetchDeleteComment,fetchEditComment,fetchEditPost,fetchDeletePost} from './../utils/api.js';
import Modal from 'react-modal';
import {Callout,Colors,Button} from 'react-foundation';
import uuid4 from 'uuid';

class PostPage extends Component {

	constructor(props){
		super()
		this.state = {
			commentModalOpen:false,
			commentHeader: '',
			commentAuthor: '',
			commentContent: '',
			commentModalType:null,
			commentId:'',
			postModalOpen: false,
			postModalTitle:'',
			postModalBody:'',
			postModalAuthor:''
		}
		this.handleInputChange.bind(this)
		this.handleSubmit.bind(this)
		this.handlePostSubmit.bind(this)
	}
	commentUp(id,num){
		commentVoting(id,'upVote').then((res) => {
			if(res.ok){
				this.props.commentUp(id,num)
			}
		})
	}
	commentDown(id,num){
		commentVoting(id,'downVote').then((res) => {
			if(res.ok){
				this.props.commentDown(id,num)
			}
		})
	}
	commentDelete(id){
		fetchDeleteComment(id).then((res) => {
			if(res.ok){
				this.props.deleteComment(id)
			}
		})
	}
	postVoteUp(id,num){
		voting(id,'upVote').then((res) => {
			if(res.ok){
				this.props.postVoteUp(id,num)
			}
		})
	}
	postVoteDown(id,num){
		voting(id,'downVote').then((res) => {
			if(res.ok){
				this.props.postVoteDown(id,num)
			}
		})
	}
	deletePost(id){
		fetchDeletePost(id).then((res) => {
			if(res.ok){
				this.props.deletePost(id)
			}
		})
	}
	handleInputChange(event){
		const name = event.target.name
		if(name === 'author_field'){
			this.setState({commentAuthor:event.target.value})
		} else if(name === 'comment_field'){
			this.setState({commentContent:event.target.value})
		}
	}
	postInputChange(event){
		const postName = event.target.name
		if(postName === 'post_title'){
			this.setState({postModalTitle:event.target.value})
		} else if(postName === 'post_body'){
			this.setState({postModalBody:event.target.value})
		} else if(postName === 'post_author'){
			this.setState({postModalAuthor:event.target.value})
		}
	}
	handleSubmit(event){
		event.preventDefault();
		const stamp = Date.now()
		if(this.state.commentModalType === 'add'){
			const parentId = this.props.post[0].id;
			const uuid = uuid4();
			const commentObj = {
				id:uuid,
				timestamp: stamp,
				body:this.state.commentContent,
				author:this.state.commentAuthor,
				parentId:parentId,
				voteScore: 1,
				deleted: false,
				parentDeleted: false
			}
			postComment(commentObj).then((res) => {
				if(res.ok){
					this.props.fetchApi(res.ok)
				}
			}).then((pass) => {
					this.closeModal()
					this.props.addComment(commentObj)
					this.props.fetchApi(false)
			})
		} else if(this.state.commentModalType === 'edit'){
			const editObj = {
				id: this.state.commentId,
				timestamp:stamp,
				body:this.state.commentContent,
			}
			fetchEditComment(editObj).then((res) => {
				if(res.ok){
				 this.props.fetchApi(res.ok)
				}
			}).then(() => {
				this.closeModal()
				this.props.editComment(editObj)
			})
		}
	}
	handlePostSubmit(e){
		e.preventDefault()
		const editPost = {
			id:this.props.post[0].id,
			title:this.state.postModalTitle,
			body:this.state.postModalBody,
		}
		fetchEditPost(editPost).then((res) => {
			if(res.ok){
				this.props.editPost(editPost)
			}
		}).then(() => {
			this.closeModal()
		})
	}
	openCommentModal(actionType,comment){
		let content;
		if(actionType === 'add'){
			content = 'Add Your Comment Here'
			this.setState((prevState) => ({
				commentModalOpen: true,
				commentHeader: content,
				commentAuthor:'',
				commentContent:'',
				commentModalType:'add',
			}))
		} else if(actionType === 'edit') {
			content = 'Edit Your Comment Here'
			this.setState((prevState) => ({
				commentModalOpen: true,
				commentHeader: content,
				commentAuthor:comment.author,
				commentContent:comment.body,
				commentModalType:'edit',
				commentId:comment.id,
			}))
		}
	}
	openPostModal(){
		this.setState(() => ({
			postModalOpen:true,
			postModalTitle:this.props.post[0].title,
			postModalBody:this.props.post[0].body,
			postModalAuthor:this.props.post[0].author
		}))
	}
	closeModal(){
		this.setState(() => ({
			commentModalOpen: false,
			postModalOpen: false,
			commentId:''
		}))
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
		const modalType = this.state.commentModalType === 'edit' ? 'hide' : 'active'
		return (
			<div className="post-page">
				<div className="post-header">
					<Button className="primary-btn" onClick={() => this.openPostModal()}>Edit</Button>
					<Button className="secondary-btn" onClick={() => this.deletePost(this.props.post[0].id)}>Delete</Button>
				</div>
				<div className="post-content">
				{this.props.post.map((indv) => {
					return <div key={indv.id} className="post-area">
								<h2>{indv.title}</h2>
								<h4>{indv.body}</h4>
								<p>Said by {indv.author}</p>
								<p>Posted at {this.updateTime(indv.timestamp)}</p>
								<div className="score-area">
									<span className="thumb-down" onClick={() => this.postVoteDown(indv.id,indv.voteScore)}></span>
									<p>{indv.voteScore}</p>
									<span className="thumb-up" onClick={() => this.postVoteUp(indv.id,indv.voteScore)}></span>
								</div>
							</div>
				})}
				</div>
				<div className="comment-header">
					<h2>COMMENTS</h2>
				</div>
				<div className="comment-content">
					<Button onClick={() => this.openCommentModal('add')} className="primary-btn" color={Colors.PRIMARY}>Add a Comment</Button>
				{this.props.comments.map((comment) => {
					return <Callout color={Colors.PRIMARY} key={comment.id} className="single-comment">
								<div className="row">
									<div className="columns medium-6">
										<p><span className="com-said">{comment.author} said:</span> {comment.body}</p>
										<p><span className="com-said">Submitted on:</span> {this.updateTime(comment.timestamp)}</p>
										<div className="comment-score">
											<span className="thumb-down" onClick={() => this.commentDown(comment.id,comment.voteScore)}></span>
											<span>{comment.voteScore}</span>
											<span className="thumb-up" onClick={() => this.commentUp(comment.id,comment.voteScore)}></span>
										</div>
									</div>
									<div className="columns medium-6">
										<div className="line-buttons">
											<Button className="secondary-btn" onClick={() => this.openCommentModal('edit',comment)}>Edit</Button>
											<Button className="secondary-btn" onClick={() => this.commentDelete(comment.id)}>Delete</Button>
										</div>
									</div>
								</div>
							</Callout>
				})}
				</div>
				<Modal
					isOpen={this.state.commentModalOpen}
					className="modal-design"
					overlayClassName="modal-overlay"
					contentLabel="comment-edit-modal"
				>
					<h3>{this.state.commentHeader}</h3>
					<div onClick={() => this.closeModal()} className="x-button">X</div>
					<form onSubmit={(e) => this.handleSubmit(e)}>
						<fieldset>
							<label>Comment</label>
							<textarea name="comment_field" value={this.state.commentContent} onChange={(e) => this.handleInputChange(e)} />
							<div className={modalType}>
								<label>Author</label>
								<input type="text" name="author_field" value={this.state.commentAuthor} onChange={(e) => this.handleInputChange(e)} />
							</div>
						</fieldset>
						<Button className="secondary-btn">Submit</Button>
					</form>
				</Modal>
				<Modal
					isOpen={this.state.postModalOpen}
					className="modal-design"
					overlayClassName="modal-overlay"
					contentLabel="post-edit-modal"
				>
					<h3>Edit this Post</h3>
					<div onClick={() => this.closeModal()} className="x-button">X</div>
					<form onSubmit={(e) => this.handlePostSubmit(e)}>
						<fieldset>
							<label>Title</label>
							<input type="text" name="post_title" onChange={(e) => this.postInputChange(e)} value={this.state.postModalTitle} />
							<label>Body</label>
							<input type="text" name="post_body" onChange={(e) => this.postInputChange(e)} value={this.state.postModalBody} />
						</fieldset>
						<Button className="secondary-btn">Submit</Button>
					</form>
				</Modal>
			</div>
		)
	}
}

function mapStatetoProps({posts},thisProps){
	const {postId} = thisProps.match.params
	return {
		post: Object.keys(posts.posts).filter((pId) => {
			if(posts.posts[pId].id === postId && posts.posts[pId].deleted === false){
				return postId
			}
		}).map((id) => {
			return posts.posts[id]
		}),
		comments: Object.keys(posts.comments).filter((comId) => {
			let indvComment = posts.comments[comId]
			if(indvComment.parentId === postId && !indvComment.deleted && !posts.posts[postId].deleted){
				return comId
			}
		}).sort((commFirst,commSecond) => {
			return posts.comments[commSecond].voteScore - posts.comments[commFirst].voteScore
		}).map((id) => {
			return posts.comments[id]
		}),
	}
}

function mapActionsToProps(dispatch){
	return {
		commentUp:(id,num) => dispatch(commentUp(id,num)),
		commentDown:(id,num) => dispatch(commentDown(id,num)),
		addComment:(data) => dispatch(addComment(data)),
		editComment:(data) => dispatch(editComment(data)),
		postVoteUp:(id,num) => dispatch(voteUp(id,num)),
		postVoteDown:(id,num) => dispatch(voteDown(id,num)),
		fetchApi:(bool) => dispatch(fetchingApi(bool)),
		deleteComment:(id) => dispatch(deleteComment(id)),
		editPost:(post) => dispatch(editPost(post)),
		deletePost:(id) => dispatch(deletePost(id)),
	}
}


export default connect(mapStatetoProps,mapActionsToProps)(PostPage)