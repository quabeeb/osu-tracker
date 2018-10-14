import _ from 'lodash';
import React, {Component} from 'react'
import FilterInput from './filter_input'
import PlayHistoryItem from './play_history_item'
import PlayHistoryOptionDropdown from './play_history_option_dropdown'

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

		const cleanUsernameFilter = this.state.usernameFilter.replace(/[^a-zA-Z 0-9]+/g,'');

		const filteredHistoryItems = _.filter(this.props.playHistoryItems, item => {
			return (_.isEmpty(this.state.usernameFilter) ? true : Boolean(item.username.match(new RegExp(cleanUsernameFilter, "i"))));
		});

		const playHistoryItems = filteredHistoryItems.map(item => 
			<PlayHistoryItem key={`${item.username}-${item.date}`} item={item} />
		);

		return (
			<div>
				<h2>
					<span>Play History </span>
					<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#filterCollapse" aria-expanded="false" aria-controls="filterCollapse">
						<span className="glyphicon glyphicon-filter" aria-hidden="true" />
					</button>					
					<PlayHistoryOptionDropdown />
				</h2>
				<div className="collapse" id="filterCollapse">
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