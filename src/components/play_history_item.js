import React from 'react'
import PlayHistoryItemOptionDropdown from './play_history_item_option_dropdown'

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

const PlayHistoryItem = (props) => {
	if(props.item.beatmapInfo == null) {
		return (
			<li className="list-group-item">
				<div>Loading...</div>
			</li>
		);
	}

	const playInfo = props.item;
	const beatmapInfo = playInfo.beatmapInfo;
	const date = new Date(new Date(playInfo.date).getTime() - new Date().getTimezoneOffset()*60000).toLocaleString()

	const username = playInfo.username;	
	const count50 = Number(playInfo.count50);
	const count100 = Number(playInfo.count100);
	const count300 = Number(playInfo.count300);
	const countMiss = Number(playInfo.countmiss);
	const acc = ((50*count50 + 100*count100 + 300*count300) / (3*(countMiss + count50 + count100 + count300))).toFixed(2);
	const rank = playInfo.rank;
	const maxPlayCombo = playInfo.maxcombo

	const beatmapId = beatmapInfo.beatmap_id;
	const beatmapSetId = beatmapInfo.beatmapset_id;
	const mapname = beatmapInfo.title;
	const mapauthor = beatmapInfo.creator;
	const artist = beatmapInfo.artist;
	const diffName = beatmapInfo.version;
	const maxMapCombo = beatmapInfo.max_combo;
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
			<div className="media">
				<div className="media-left">
					<img className="media-object" src={`https://b.ppy.sh/thumb/${beatmapSetId}l.jpg`} alt="Image not found" />
				</div>
				<div className="media-body">
					<div>
						<span>{date} - </span>
						<a href={`https://osu.ppy.sh/u/${username}`} target="_blank">
							{username}
						</a>
						<PlayHistoryItemOptionDropdown />
					</div>
					<div> 
						<a href={`https://osu.ppy.sh/b/${beatmapId}`} target="_blank">
							{artist} - {mapname} [{diffName} - {starsRounded} stars]
						</a>
					</div>
					<div>
						<span>Mapped by </span>
						<a href={`https://osu.ppy.sh/u/${mapauthor}`} target="_blank">
							{mapauthor}
						</a>
					</div>
					<div>
						{rank} ({acc}%) {modString} | {maxPlayCombo}/{maxMapCombo}x
					</div>
				</div>
			</div>
		</li>
	);
};

export default PlayHistoryItem;