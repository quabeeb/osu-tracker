import React, {Component} from 'react'
import APIKeyInput from './api_key_input'
import UsernameInput from './username_input'

class InputList extends Component {
	render() {
		return (
			<form>
				<APIKeyInput />
				<UsernameInput />
			</form>
		);
	}
}

export default InputList;