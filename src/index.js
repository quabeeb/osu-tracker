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
			mostRecentDate: new Date(0)
		};
	}

	addRecentPlays(tempHistoryItems, apiKey) {
		const ascDateItems = tempHistoryItems.reverse();

		_.each(ascDateItems, (tempHistoryItem) => {
			this.retrieveAndAddBeatmapInfo(apiKey, tempHistoryItem);
		});
	}

	addPlayToHistory(playHistoryItem) {
		// calculations to compare and display in local time
		// dates returned from osu! API are in UTC
		const checkDate = new Date(new Date(new Date(playHistoryItem.date).getTime() - new Date().getTimezoneOffset()*60000).toLocaleString());

		if (this.state.mostRecentDate >= checkDate) {
			return;
		}

		const playHistoryItems = this.state.playHistoryItems.slice();
		playHistoryItems.unshift(playHistoryItem);

		this.setState({
			playHistoryItems: playHistoryItems, 
			currentSelection: this.state.currentSelection,
			mostRecentDate: checkDate
		});
	}

	retrieveRecentPlays(username, apiKey) {
		if (_.isEmpty(username) || _.isEmpty(apiKey)) {
			return;
		}

		const proxyURL="http://localhost:8888";

		fetch(`${proxyURL}/https://osu.ppy.sh/api/get_user_recent?k=${apiKey}&u=${username}`)
		.then(results => results.json())
		.then(data => this.addRecentPlays(data, apiKey));
	}

	retrieveAndAddBeatmapInfo(apiKey, playHistoryItem) {
		if (_.isEmpty(apiKey) || _.isEmpty(playHistoryItem)) {
			return;
		}

		const proxyURL="http://localhost:8888";
		const beatmapId = playHistoryItem.beatmap_id;

		fetch(`${proxyURL}/https://osu.ppy.sh/api/get_beatmaps?k=${apiKey}&b=${beatmapId}`)
		.then(results => results.json())
		.then(beatmapInfo => {
			playHistoryItem.beatmapInfo=beatmapInfo[0];
			return playHistoryItem;
		})
		.then(playHistoryItem => this.addPlayToHistory(playHistoryItem));
	}

	clearPlayHistory() {
		this.setState({
			playHistoryItems: [],
			currentSelection: null,
			mostRecentDate: new Date()
		});
	}

	render() {
		const retrieveRecentPlays = _.debounce((username, apiKey) => { this.retrieveRecentPlays(username, apiKey) }, 500);

		return (
			<div>
				<ConfigurationInput onUserInputChange={retrieveRecentPlays} />
				<PlayHistoryItemList 
					playHistoryItems={this.state.playHistoryItems} 
					mostRecentDate={this.state.mostRecentDate} />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.querySelector(".container-fluid"));