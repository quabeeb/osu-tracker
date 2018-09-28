import React, {Component} from 'react'
import PlayHistoryItem from './play_history_item'

class PlayHistoryItemList extends Component{
	constructor(props) {
		super(props);

		this.state = {
			itemCount: 0,
			lastRefresh: new Date(),
			playHistoryItems : []
		}

		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
		this.state.playHistoryItems.push(<PlayHistoryItem />);
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
	

	render() {
		const playHistoryItems = this.state.playHistoryItems.map((item, idx) => 
			<li className="list-group-item" key={idx}> 
				{item}
			</li>
		);

		return (
			<div>
				<h1>Play History</h1>
				<div> 
					Last refreshed: {this.state.lastRefresh.toString()}
				</div>
				<ul className="list-group list-group-flush andy-scrollable">
					{playHistoryItems}
				</ul>
			</div>
		);
	}
}

export default PlayHistoryItemList;