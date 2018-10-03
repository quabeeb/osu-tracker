import React from 'react'
import PlayHistoryItem from './play_history_item'

const PlayHistoryItemList = (props) => {
	if(!props.playHistoryItems) {
		return <div>Loading...</div>
	}

	const playHistoryItems = props.playHistoryItems.map(item => 
		<PlayHistoryItem key={item.date} item={item} />
	);

	return (
		<div>
			<h1>Play History</h1>
			<div> 
				Last play: {props.mostRecentDate.toLocaleString()}
			</div>
			<ul className="list-group list-group-flush andy-scrollable">
				{playHistoryItems}
			</ul>
		</div>
	);
};

export default PlayHistoryItemList;