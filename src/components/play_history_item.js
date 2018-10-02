import React from 'react'

const PlayHistoryItem = (props) => {
	const playInfo = props.item;
	const beatmapInfo = playInfo.beatmapInfo;
	
	const date = new Date(new Date(playInfo.date).getTime() - new Date().getTimezoneOffset()*60000).toLocaleString()

	const rank = playInfo.rank;
	const mods = playInfo.enabled_mods;

	const count50 = playInfo.count50;
	const count100 = playInfo.count100;
	const count300 = playInfo.count300;
	const countMiss = playInfo.countmiss;
	const acc = '';

	const beatmapId = playInfo.beatmap_id;
	const mapname = beatmapInfo.title;
	const mapauthor = beatmapInfo.creator;
	const diffName = beatmapInfo.version;
	const stars = beatmapInfo.difficultyrating;
	const starsRounded = Number(stars).toFixed(2);
	
	return(
		<li className="list-group-item">
			<div> {date} </div>
			<div> {mapauthor} - {mapname} [{diffName} - {starsRounded} stars] ({mods})</div>
			<div> {rank} ({acc})</div>
		</li>
	);	
};

export default PlayHistoryItem;