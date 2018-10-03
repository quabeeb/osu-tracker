import React from 'react'

const PlayHistoryItem = (props) => {
	const playInfo = props.item;
	const beatmapInfo = playInfo.beatmapInfo;
	const date = new Date(new Date(playInfo.date).getTime() - new Date().getTimezoneOffset()*60000).toLocaleString()
	
	const count50 = Number(playInfo.count50);
	const count100 = Number(playInfo.count100);
	const count300 = Number(playInfo.count300);
	const countMiss = Number(playInfo.countmiss);
	const acc = ((50*count50 + 100*count100 + 300*count300) / (3*(countMiss + count50 + count100 + count300))).toFixed(2);
	const rank = playInfo.rank;

	const beatmapId = playInfo.beatmap_id;
	const mapname = beatmapInfo.title;
	const mapauthor = beatmapInfo.creator;
	const diffName = beatmapInfo.version;
	const stars = beatmapInfo.difficultyrating;
	const starsRounded = Number(stars).toFixed(2);

	const mods = Number(playInfo.enabled_mods);
	const modArray = [];

	_.forEach(modMap, (key, value) => {
		if(mods & key) {
			modArray.push(value);
		}
	});
	
	const modString = mods ? `(${modArray.toString()})` : '';

	return(
		<li className="list-group-item">
			<div> {date} </div>
			<div> {mapauthor} - {mapname} [{diffName} - {starsRounded} stars] {modString}</div>
			<div> {rank} ({acc}%)</div>
		</li>
	);	
};

const modMap = {
	'NF' : 1,
	'EZ' : 2,
	'TD' : 4, //touch device
	'HD' : 8,
	'HR' : 16,
	'SD' : 32,
	'DT' : 64,
	'RX' : 128,
	'HT' : 256,
	'NC' : 512,
	'FL' : 1024,
	'AU' : 2048, //autoplay
	'SO' : 4096,
	'AP' : 8192
}

export default PlayHistoryItem;