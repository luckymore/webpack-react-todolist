import React, { Component } from 'react'

export default class TodoFooter extends Component {
	render() {
		let { isAllChecked, total, rest, filter } = this.props,
			btnActive = {'all':'','active':'','completed':''};

		btnActive[filter] = 'btn-active';

		return (
			<div className="todo-footer">
				<input type="checkbox" onChange={this.props.toggleSelect} checked={isAllChecked}/>
				<label>{ `${rest} items completed，total ${total}` }</label>
				<button className={btnActive['all']} onClick={() => this.props.filterList('all')}>All</button>
				<button className={btnActive['active']} onClick={() => this.props.filterList('active')}>Active</button>
				<button className={btnActive['completed']} onClick={() => this.props.filterList('completed')}>Completed</button>
				<button onClick={this.props.clearCompleted}>Clear completed</button>
			</div>
		);
	}
}