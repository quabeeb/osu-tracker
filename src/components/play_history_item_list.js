import _ from 'lodash';
import React, {Component} from 'react'
import FilterInput from './filter_input'
import PlayHistoryItem from './play_history_item'

class PlayHistoryItemList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			usernameFilter: ''
		};
	}

	handleUsernameFilter(usernameFilter) {
		this.setState({
			usernameFilter: usernameFilter
		});
	}

	render() {
		if(!this.props.playHistoryItems) {
			return <div>Loading...</div>
		}

		const filteredHistoryItems = _.filter(this.props.playHistoryItems, item => {
			return (_.isEmpty(this.state.usernameFilter) ? true : Boolean(item.username.match(new RegExp(this.state.usernameFilter, "i"))))
		});

		const playHistoryItems = filteredHistoryItems.map(item => 
			<PlayHistoryItem key={item.date} item={item} />
		);

		return (
			<div>
				<h1>
					<span>Play History </span>
					<a className="btn btn-link" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
						Show Filters
					</a>
				</h1>
				<div className="collapse" id="collapseExample">
					<FilterInput onInputChange={(username) => {this.handleUsernameFilter(username)}}/>
				</div>
				<div> 
					Last play: {this.props.mostRecentDate.toLocaleString()}
				</div>
				<ul className="list-group list-group-flush scrollable">
					{playHistoryItems}
				</ul>
			</div>
		);
	}
};

export default PlayHistoryItemList;