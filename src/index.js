import React from 'react'
import ReactDOM from 'react-dom'
import InputList from './components/input_list'
import PlayHistoryItemList from './components/play_history_item_list'

ReactDOM.render(<InputList />, document.querySelector("#inputs"));
ReactDOM.render(<PlayHistoryItemList />, document.querySelector("#playlist"));