import React, {Component} from 'react'

class PlayHistoryItemOptionDropdown extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<span className="dropdown pull-right">
				<button className="btn btn-link dropdown-toggle" type="button" id="playHistoryItemOptionDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					<span className="glyphicon glyphicon-option-vertical" aria-hidden="true" />
				</button>
				<ul className="dropdown-menu" aria-labelledby="playHistoryItemOptionDropdown">
					<li><a href="#">Delete this item</a></li>
				</ul>
			</span>
		);
	}
};

export default PlayHistoryItemOptionDropdown;