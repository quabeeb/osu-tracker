import React, {Component} from 'react'

class ConfigurationInput extends Component{
	constructor(props) {
		super(props);

		this.state = { 
			username: '',
			apikey: ''
		};
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

	onUserNameInputChange(username) {
		this.setState({username: username, apikey: this.state.apikey});
		this.props.onUserInputChange(this.state.username, this.state.apikey);
	}

	onAPIKeyInputChange(apikey) {
		this.setState({username: this.state.username, apikey: apikey});
		this.props.onUserInputChange(this.state.username, this.state.apikey);
	}
}

export default ConfigurationInput;