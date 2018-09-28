import React, {Component} from 'react'

class APIKeyInput extends Component{
	render() {
		return (
			<div className="form-group">
				<label htmlFor="osuAPIKeyInput">osu! API Key</label>
				<input type="password" className="form-control" id="osuAPIKeyInput" placeholder="osu! API Key" />
			</div>
		);
	}
}

export default APIKeyInput;