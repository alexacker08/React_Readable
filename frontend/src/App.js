import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PostPage from './component/PostPage.js';
import ShowPosts from './component/ShowPosts.js';
import { addPost,showCats,getComments } from './actions/index.js';
import { fetchAllPosts,fetchCategories,fetchComments } from './utils/api.js';
import './App.css';

class App extends Component {

  capitalize = (str) => {
	  return typeof str !== 'string'
	    ? ''
	    : str[0].toUpperCase() + str.slice(1)
  }
  componentWillMount(){
  	//Start with the initial API request of getting all the posts
  	//This then creates a Promise chain which then enables other API grabs including all of the comments and categories available
  	fetchAllPosts().then((data) => {
  		return this.gatherPosts(data)
  	}).then((postData) => {
  		//Gatering all available comments
  		this.gatherComments(postData)
  	}).then(() => {
  		//Gather all available categories
  		this.gatherCategories()
  	})
  }

  //Fetch all the posts from the API
  gatherPosts(data){
		let postKeys = Object.keys(data);
		let postObj = {}

		postKeys.forEach((num) => {
			let postId = data[num].id
			this.props.addPost(data[num])
			postObj[postId] = data[num]
		})
		return postObj
  }

  //Fetches all Categories from API then updates store
  gatherCategories(){
  	fetchCategories().then((data) => {
  		const parseData = JSON.parse(data)
  		const categories = Object.keys(parseData.categories).map((key) => {
  			return parseData.categories[key].name
  		})
	  		this.props.addCats(categories)
  	})
  }

  //Gathers all comments from the API and runs them through the reducer
  gatherComments(postObj){
	//Grabbing Comments
	const arrOfId = Object.keys(postObj)
	arrOfId.forEach((id) => {
		fetchComments(id).then((comment) => {
			let commentParse = JSON.parse(comment)
			commentParse.forEach((comment) => {
				this.props.getComments(comment)
			})
		})
	})
  }

	render() {
		const {categories,posts} = this.props
		return (
		  	<Router>
			  	<div className="App-holder">
				  	<div className="App-header">
			      		<div className="row">
			      			<div className="columns medium-6">
			      				<img className="header-image" src="/chat.svg" />
			      				<Link to='/'><h2>Coding Comment App</h2></Link>
			      			</div>
			      			<div className="columns medium-6">
			      				<div className="cat-drop">
			      					<ul>
			      						{categories.map((cat) => {
			      							return <li key={cat}>
			      										<Link to={`/${cat}`} key={cat}>{this.capitalize(cat)}</Link>
			      									</li>
			      						})}
			      					</ul>
			      				</div>
			      			</div>
			      		</div>
			    	</div>
				  	<Route exact path="/:category?" component={ShowPosts}/>
				  	<Route path="/:category/:postId" component={PostPage} />
			  	</div>
		  	</Router>
		);
	}
}

function mapStateToProps({posts}){
	//console.log(posts)
	return {
		categories: Object.keys(posts.categories).map((cat) => {
			return posts.categories[cat]
		})
	}
}
function mapActionsToProps(dispatch){
	return {
		addPost:(data) => dispatch(addPost(data)),
		addCats:(data) => dispatch(showCats(data)),
		getComments:(data) => dispatch(getComments(data)),
	}
}

export default connect(mapStateToProps,mapActionsToProps)(App)
