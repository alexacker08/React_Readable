import React, {Component} from 'react'

class ErrorComp extends Component {

	render(){
		return (
			<div className="error-container">
				<h3>POST IS GONE!</h3>
				<p>The post you're trying to access doesn't exist or has been deleted....Sorry</p>
				<div className="crying-image"></div>
			</div>
		)
	}
}

export default ErrorComp