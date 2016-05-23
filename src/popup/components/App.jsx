import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component{
	render(){
		return <div>
			<h3>Current Youtube</h3>
			<p>{this.props.currentUrl}</p>
		</div>
	}
}

function mapStateToProps(state){
	return {
		currentUrl : state.currentUrl
	}
}

export default connect(mapStateToProps)(App)
