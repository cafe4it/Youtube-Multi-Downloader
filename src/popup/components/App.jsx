import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import chooseFormat from '../../background/actions/choose_youtube_format.js';
import _ from 'lodash';
class App extends Component{
	constructor(props){
		super(props);
		this._getStreamsByFormat = this._getStreamsByFormat.bind(this);
	}
	componentDidMount(){
		//this._getStreamsByFormat();
		this.formats = ['MP4','WEBM','3GP', 'FLV', 'Audio'];
		let streams = [];
		if(this.props.currentInfo){
			this.formats = _.keys(this.props.currentInfo.streams);
			let defaultFormat = this.formats[0];
			console.info(streams, defaultFormat, this.formats);
			streams = this.props.currentInfo.streams[defaultFormat];
		}
		this.props.chooseFormat(streams);

	}
	componentDidUpdate(){

	}
	_getStreamsByFormat(e){
		let format = e.target.value;
		let streams = this.props.currentInfo.streams[format];
		this.props.chooseFormat(streams);
	}
	render(){

		return <div className="container">
			{this.props.currentInfo ?
			<table className="table-youtube">
				<caption>{this.props.currentInfo.title}</caption>
				<tbody>
					<tr>
						<td width="120px"><img src={this.props.currentInfo.poster ? this.props.currentInfo.poster : null} alt={this.props.currentInfo.title}/></td>
						<td width="380px" className="streams-body">
							<table className="table-streams">
								<tbody>
									<tr>
										<td>Choose a format : <select onChange={this._getStreamsByFormat}>
											{this.formats.map((fm)=>{
												return <option key={fm} value={fm}>{fm}</option>
											})}
										</select></td>
									</tr>
									<tr>
										<td>
											{this.props.currentStreams ?
												<ul className="table-stream">
													{this.props.currentStreams.map((str)=>{
														return <li key={str.id} ><a target="_blank" href={str.url}>{str.quality} {str.flag ? `(${str.flag})` : null}</a> &nbsp;</li>
													})}
												</ul>
												: null}
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table> : null}
		</div>
	}
}

function mapStateToProps(state){
	return {
		currentInfo : state.videoInfo,
		currentStreams : state.streamsByFormat
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({chooseFormat : chooseFormat}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
