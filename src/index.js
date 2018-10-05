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

	retrieveRecentPlays(username, apiKey) {
		if (_.isEmpty(username) || _.isEmpty(apiKey)) {
			return;
		}

		const proxyURL = "http://localhost:8888";

		fetch(`${proxyURL}/https://osu.ppy.sh/api/get_user_recent?k=${apiKey}&u=${username}`)
		.then(results => results.json())
		.then(data => this.addRecentPlays(data, apiKey))
		.catch(e => console.log("API Key may be invalid or expired. Check https://osu.ppy.sh/p/api"))

		ReactDOM.hydrate(<App />, document.querySelector(".container-fluid"));
	}

	addRecentPlays(tempHistoryItems, apiKey) {
		const newHistoryItems = _.filter(tempHistoryItems, (item) => {
			return (this.state.mostRecentDate < this.convertDateFromUTCToLocal(item.date));
		});

		_.each(newHistoryItems, (tempHistoryItem) => {
			this.retrieveAndAddBeatmapInfo(apiKey, tempHistoryItem);
		});

		this.addItemsToHistory(newHistoryItems);
	}

	retrieveAndAddBeatmapInfo(apiKey, playHistoryItem) {
		if (_.isEmpty(apiKey) || _.isEmpty(playHistoryItem)) {
			return;
		}

		const proxyURL = "http://localhost:8888";
		const beatmapId = playHistoryItem.beatmap_id;

		fetch(`${proxyURL}/https://osu.ppy.sh/api/get_beatmaps?k=${apiKey}&b=${beatmapId}`)
		.then(results => results.json())
		.then(beatmapInfo => {
			playHistoryItem.beatmapInfo=beatmapInfo[0];
		});
	}

	addItemsToHistory(newHistoryItems) {
		if (_.isEmpty(newHistoryItems)) {
			return;
		}

		const playHistoryItems = this.state.playHistoryItems.slice();
		const reversedList = newHistoryItems.reverse();
		const maxDate = this.convertDateFromUTCToLocal(_.maxBy(reversedList, 'date').date);

		_.each(reversedList, (item) => {
			playHistoryItems.unshift(item);
		});

		this.setState({
			playHistoryItems: playHistoryItems, 
			currentSelection: this.state.currentSelection,
			mostRecentDate: maxDate
		});
	}

	clearPlayHistory() {
		this.setState({
			playHistoryItems: [],
			currentSelection: null,
			mostRecentDate: new Date()
		});
	}

	convertDateFromUTCToLocal(dateToConvert) {
		return new Date(new Date(new Date(dateToConvert).getTime() - new Date().getTimezoneOffset()*60000).toLocaleString());
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