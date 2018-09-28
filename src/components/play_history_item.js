import React, {Component} from 'react'

class PlayHistoryItem extends Component{
	constructor(props) {
		super(props);

		this.state = {
			date: '1/1/1900 12:05pm',
			rank: 'SS',
			mods: 'HD,HR',
			acc: '100.00',
			mapname: 'necrofantasia',
			mapauthor: 'monstrata',
			diffName: 'Extreme',
			stars: '6.11'
		};
	}

	render() {
		return(
			<div>
				<div> {this.state.date} </div>
				<div> {this.state.mapauthor} - {this.state.mapname} [{this.state.diffName} - {this.state.stars} stars] ({this.state.mods})</div>
				<div> {this.state.rank} ({this.state.acc})</div>
			</div>
		);
	}
}

export default PlayHistoryItem;