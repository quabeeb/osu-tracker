import React from 'react'

const PlayHistoryItem = (props) => {
	const date = '';
	const rank = '';
	const mods = '';
	const acc = '';
	const mapname = '';
	const mapauthor = '';
	const diffName = '';
	const stars = '';
	
	return(
		<div>
			<div> {props.date} </div>
			<div> {props.mapauthor} - {props.mapname} [{props.diffName} - {props.stars} stars] ({props.mods})</div>
			<div> {props.rank} ({props.acc})</div>
		</div>
	);	
};

export default PlayHistoryItem;