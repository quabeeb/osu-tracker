import React from 'react'

const PlayHistoryItem = (props) => {	
	const date = props.item.date;
	const rank = props.item.rank;
	const mods = props.item.enabled_mods;

	const count50 = props.item.count50;
	const count100 = props.item.count100;
	const count300 = props.item.count300;
	const countMiss = props.item.countmiss;
	const acc = '';

	const beatmapId = props.item.beatmap_id; //use to get beatmap info
	const mapname = '';
	const mapauthor = '';
	const diffName = '';
	const stars = '';
	
	return(
		<div className="list-group-item">
			<div> {date} </div>
			<div> {mapauthor} - {mapname} [{diffName} - {stars} stars] ({mods})</div>
			<div> {rank} ({acc})</div>
		</div>
	);	
};

export default PlayHistoryItem;