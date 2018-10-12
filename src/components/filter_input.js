import React, {Component} from 'react'

class FilterInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			usernameFilter:''
		}
	}

	onUserNameInputChange(usernameFilter) {
		this.setState({
			usernameFilter: usernameFilter}, 
			() => {this.props.onInputChange(this.state.usernameFilter)
		});
	}

	render(){
		return (
			<div className="form-group">
				<label htmlFor="usernameFilterInput">Filter username</label>
				<input 
					value={this.state.usernameFilter} 
					onChange={event => this.onUserNameInputChange(event.target.value)}
					type="text" 
					className="form-control" 
					id="usernameFilterInput" 
					placeholder="Username Filter" />
			</div>
		);
	}
};

export default FilterInput;

