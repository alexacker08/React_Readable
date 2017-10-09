import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

class PostPage extends Component {


	componentDidMount(){



	}

	testFunc(){

	}

	render(){
		const {postId} = this.props.match.params
		//console.log(this.props.match)
		return (
			<div className="post-page">
				This is a Post Page {postId}
			</div>
		)
	}
}

function mapStatetoProps(){


}



export default connect(mapStatetoProps)(PostPage)