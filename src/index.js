import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ConfigurationInput from './components/configuration_input';
import PlayHistoryItemList from './components/play_history_item_list';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playHistoryItems: [],
			currentSelection: null,
			mostRecentDate: new Date()
		};
	}

	retrieveRecentPlays(username, apikey) {
		const proxyURL="http://localhost:8888";
		var playHistoryItems = [];

		fetch(`${proxyURL}/https://osu.ppy.sh/api/get_user_recent?k=${apikey}&u=${username}`)
		.then(results => results.json())
		.then(data => this.addRecentPlays(data));
	}

	addRecentPlays(tempHistoryItems) {
		const ascDateItems = tempHistoryItems.reverse();

		_.each(ascDateItems, (tempHistoryItem) => {
			this.addPlayToHistory(tempHistoryItem);
		});
	}

	addPlayToHistory(playHistoryItem) {
		const checkDate = new Date(playHistoryItem.date);

		if (this.state.mostRecentDate < checkDate) {
			const playHistoryItems = this.state.playHistoryItems.slice();

			playHistoryItems.unshift(playHistoryItem);

			this.setState({
				playHistoryItems: playHistoryItems, 
				currentSelection: this.state.currentSelection,
				mostRecentDate: checkDate
			});
		}
	}

	clearPlayHistory() {
		this.setState({
			playHistoryItems: [],
			currentSelection: null,
			mostRecentDate: new Date()
		});
	}

	render() {
		const retrieveRecentPlays = _.debounce((username, apikey) => { this.retrieveRecentPlays(username, apikey) }, 500);

		return (
			<div>
				<ConfigurationInput onUserInputChange={retrieveRecentPlays} />
				<PlayHistoryItemList playHistoryItems={this.state.playHistoryItems} />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.querySelector(".container-fluid"));