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
			username: '',
			apikey: ''
		};
	}

	retrieveRecentPlays(username, apikey) {
		fetch(`https://osu.ppy.sh/api/get_user_recent?k=${apikey}&u=${username}`, {'mode': 'no-cors'})
		.then(results => {
			console.log(results.json());
		})
		/*
		var xhr = new XMLHttpRequest()
		xhr.open("GET", `https://osu.ppy.sh/api/get_user_recent?k=${apikey}&u=${username}`, true)
		
		xhr.onload = function(e){
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var recentPlays = JSON.parse(xhr.response);
					console.log(recentPlays)
				} else {
					console.error(xhr.statusText)
				}
			}
		}.bind(this)

		xhr.onerror = function(e){
			console.error(xhr.statusText)
		}
		xhr.send(null)
		*/
		
	}

	render() {
		const retrieveRecentPlays = _.debounce((username, apikey) => { this.retrieveRecentPlays(this.state.username, this.state.apikey) }, 500);

		return (
			<div>
				<ConfigurationInput onUserInputChange={retrieveRecentPlays} />
				<PlayHistoryItemList />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.querySelector(".container-fluid"));