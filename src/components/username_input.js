import React, {Component} from 'react'

class UsernameInput extends Component{
	render() {
		return (
			<div className="form-group">
				<label htmlFor="usernameInput">Username</label>
				<input type="text" className="form-control" id="usernameInput" placeholder="Username" />
			</div>
		);
	}
}

export default UsernameInput;