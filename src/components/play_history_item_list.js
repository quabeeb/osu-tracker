import React, {Component} from 'react'
import PlayHistoryItem from './play_history_item'

class PlayHistoryItemList extends Component{
	constructor(props) {
		super(props);

		this.state = {
			itemCount: 0,
			playHistoryItems : []
		}

		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
	}

	render() {
		const playHistoryItems = this.state.playHistoryItems.map((item, idx) => 
			<li className="list-group-item" key={idx}> 
				{item}
			</li>
		);

		return (
			<div>
				<h1>Play History</h1>
				<ul className="list-group list-group-flush">{playHistoryItems}</ul>
			</div>
		);
	}
}

export default PlayHistoryItemList;