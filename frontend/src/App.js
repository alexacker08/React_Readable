import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Posts from './component/Posts.js';
import PostPage from './component/PostPage.js';
import ShowPosts from './component/ShowPosts.js';
import { addPost,showCats,getComments } from './actions/index.js';
import { grabAllPosts,grabCategories,grabComments } from './utils/api.js';
import './App.css';

class App extends Component {

  capitalize = (str) => {
	  return typeof str !== 'string'
	    ? ''
	    : str[0].toUpperCase() + str.slice(1)
  }
  componentDidMount(){
  	//Grabs all posts
  	grabAllPosts().then((data) => {
  		let postKeys = Object.keys(data);
  		let postObj = {}
  		let newArr = []
  		let catArr = []

  		postKeys.forEach((num) => {
  			let postId = data[num].id
  			let category = data[num].category
  			if(catArr.indexOf(category) === -1){
  				catArr.push(category)
  			}
  			postObj[postId] = data[num]
  		})

  		this.props.addPost(postObj)
  		return postObj
  	}).then((data) => {
  		//Gatering all available comments
  		this.gatherComments(data)
  		console.log()
  	}).then(() => {
  		this.gatherCategories()
  	})
  }

  gatherCategories(){
  	grabCategories().then((data) => {
  		const parseData = JSON.parse(data)
  		const categories = Object.keys(parseData.categories).map((key) => {
  			return parseData.categories[key].name
  		})
  		this.props.addCats(categories)
  	})
  }
  gatherComments(postObj){
	//Grabbing Comments
	const arrOfId = Object.keys(postObj)
	arrOfId.forEach((id) => {
		grabComments(id).then((comment) => {
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
			      		<Link to='/'><h2>This is the beginning of my Comment App</h2></Link>
			    	</div>
			    	<div className="container">
				    	<div className="Categories">
				    		{categories.map((cat) => {
				    			return <Link to={`/${cat}`} key={cat}>
				    						<div className="category">
				    							<span>{this.capitalize(cat)}</span>
				    						</div>
				    					</Link>
				    		})}
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
