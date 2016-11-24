import React, { Component } from 'react'

export default class TodoFooter extends Component {
	handleKeyUp(e) {
		if(e.keyCode === 13) {
			let v = e.target.value;

			if(!v.trim()) return;

			this.props.addTodoItem({
				text: v,
				completed: false,
				display: true
			})
			e.target.value = ''
		}
	}

	render() {
		return (
			<div className="todo-header">
				<input type="text" onKeyUp={this.handleKeyUp.bind(this)} placeholder="What do you want to do?"/>
			</div>
		);
	}
}