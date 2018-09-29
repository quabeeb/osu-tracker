import React from 'react'
import PlayHistoryItem from './play_history_item'

const PlayHistoryItemList = (props) => {
	if(!props.playHistoryItems) {
		return <div>Loading...</div>
	}

	const playHistoryItems = props.playHistoryItems.map((item, idx) => 
		<li className="list-group-item" key={idx}> 
			{item}
		</li>
	);

	return (
		<div>
			<h1>Play History</h1>
			<div> 
				Last refreshed: {props.lastRefresh.toString()}
			</div>
			<ul className="list-group list-group-flush andy-scrollable">
				{playHistoryItems}
			</ul>
		</div>
	);
	
};

export default PlayHistoryItemList;


/*
constructor(props) {
	super(props);

	this.state = {
		itemCount: 0,
		lastRefresh: new Date(),
		playHistoryItems : []
	}
}

componentDidMount() {
	this.timerID = setInterval(
		() => this.updateRefreshTime(),
		30000
	);
}

componentWillUnmount() {
	clearInterval(this.timerID);
}

updateRefreshTime() {
	this.setState({
		itemCount: 0,
		lastRefresh: new Date(),
		playHistoryItems: this.state.playHistoryItems
	});
}
*/