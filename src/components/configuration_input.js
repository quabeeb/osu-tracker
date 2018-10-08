import React, {Component} from 'react'

class ConfigurationInput extends Component {
	constructor(props) {
		super(props);

		const username = window.localStorage.getItem('username') || '';
		const apikey = window.localStorage.getItem('apikey') || '';

		this.state = { 
			username: username,
			apikey: apikey
		};

		this.refreshClock = setInterval(
			() => {this.props.onUserInputChange(this.state.username, this.state.apikey)},
			Number(props.refreshRate)
		);
	}

	onUserNameInputChange(username) {
		this.setState({
			username: username, apikey: this.state.apikey}, 
			() => {this.props.onUserInputChange(this.state.username, this.state.apikey)
		});

		window.localStorage.setItem('username', username);
	}

	onAPIKeyInputChange(apikey) {
		this.setState({
			username: this.state.username, apikey: apikey}, 
			() => {this.props.onUserInputChange(this.state.username, this.state.apikey)
		});

		window.localStorage.setItem('apikey', apikey);
	}

	render() {
		return (
			<div>
				<div className="form-group">
					<label htmlFor="osuAPIKeyInput">osu! API Key</label>
					<input 
						value={this.state.apikey} 
						onChange={event => this.onAPIKeyInputChange(event.target.value)}
						type="password" 
						className="form-control" 
						id="osuAPIKeyInput" 
						placeholder="osu! API Key" />
				</div>
				<div className="form-group">
					<label htmlFor="usernameInput">Username</label>
					<input 
						value={this.state.username} 
						onChange={event => this.onUserNameInputChange(event.target.value)}
						type="text" 
						className="form-control" 
						id="usernameInput" 
						placeholder="Username" />
				</div>
			</div>
		);
	}
}

export default ConfigurationInput;