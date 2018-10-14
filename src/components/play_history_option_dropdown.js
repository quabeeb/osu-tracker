import React, {Component} from 'react'

class PlayHistoryOptionDropdown extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<span className="dropdown">
				<button className="btn btn-link dropdown-toggle" type="button" id="playHistoryOptionsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					<span className="glyphicon glyphicon-cog" aria-hidden="true" />
				</button>
				<ul className="dropdown-menu" aria-labelledby="playHistoryOptionsDropdown">
					<li><a href="#">Clear History</a></li>
					<li><a href="#">Export all</a></li>
					<li><a href="#">Export filtered items</a></li>
				</ul>
			</span>
		);
	}
};

export default PlayHistoryOptionDropdown;