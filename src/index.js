import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ConfigurationInput from './components/configuration_input';
import PlayHistoryItemList from './components/play_history_item_list';

var CONFIG = require("../.config");

const proxyURL = CONFIG.proxyurl;
const refreshRate = CONFIG.refreshRate;

class App extends Component {
	constructor(props) {
		super(props);
		const playHistoryItems = JSON.parse(window.localStorage.getItem('playHistoryItems')) || [];
		const mostRecentDate = new Date(window.localStorage.getItem('mostRecentDate')) || new Date(0);

		this.state = {
			playHistoryItems: playHistoryItems,
			currentSelection: null,
			mostRecentDate: mostRecentDate
		};
	}

	retrieveRecentPlays(username, apiKey) {
		if (_.isEmpty(username) || _.isEmpty(apiKey)) {
			return;
		}

		fetch(`${proxyURL}/https://osu.ppy.sh/api/get_user_recent?k=${apiKey}&u=${username}`)
			.then(results => results.json())
			.then(data => this.addRecentPlays(data, username, apiKey))
			.then(save => {
				window.localStorage.setItem('playHistoryItems', JSON.stringify(this.state.playHistoryItems));
				window.localStorage.setItem('mostRecentDate', this.state.mostRecentDate);
			})
			.catch(e => console.log("API Key may be invalid or expired. Check https://osu.ppy.sh/p/api"))
	}

	addRecentPlays(tempHistoryItems, username, apiKey) {
		const newHistoryItems = _.filter(tempHistoryItems, item => {
			return (this.state.mostRecentDate < this.convertDateFromUTCToLocal(item.date));
		});

		const beatmapInfoRequests = newHistoryItems.map(item => {
			return fetch(`${proxyURL}/https://osu.ppy.sh/api/get_beatmaps?k=${apiKey}&b=${item.beatmap_id}`)
		});

		Promise.all(beatmapInfoRequests)
			.then(responses => Promise.all(responses.map(r => r.json())))
			.then(infos => {
				return newHistoryItems.map((item, idx) => {
					item.username=username;
					item.beatmapInfo=infos[idx][0];
					return item;
				});
			})
			.then(addHistoryItems => this.addItemsToHistory(addHistoryItems))
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
				<h1>
					<span>osu! tracker </span>
					<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#configurationCollapse" aria-expanded="false" aria-controls="configurationCollapse">
						<span className="glyphicon glyphicon-user" aria-hidden="true"></span>
					</button>
				</h1>
				<div id="configurationCollapse" className="collapse in">
					<ConfigurationInput 
						onUserInputChange={retrieveRecentPlays} 
						refreshRate={refreshRate}/>
				</div>
				<PlayHistoryItemList 
					playHistoryItems={this.state.playHistoryItems} 
					mostRecentDate={this.state.mostRecentDate} />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.querySelector(".container-fluid"));