import React, { Component } from 'react'

export default class TodoItems extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	eles: [],
	  	editText: ' '
	  };
	}

	handleChange(item, index) {
		// console.log(e)
		// console.log(index)
		// e.target.checked = true;
		// e.currentTarget.checked = false;
		this.props.checkedItem(index, item.completed)
	}

	hideEditInput(index) {
		this.state.eles[index].className = 'todo-item'
	}

	showEditInput(e, index, item) {
		this.state.eles[index].className += ' editing'
		let el = e.target.parentNode.nextSibling
		this.setState({editText: item.text})
		el.focus()
	}

	handleEditing(event) {
		this.setState({editText: event.target.value})
	}

	handleEditEnd(event,index) {
		if (event.which === 13) {
			this.props.saveEdit(index,this.state.editText)
			this.hideEditInput(index)
		} else if (event.which === 27) {
			this.hideEditInput(index)
		}
	}


	renderItem(item, index) {
		if(!item.display) return;
		let done = '';
		if(item.completed) done = 'task-done'
		return (
			<li ref={(ele) => { this.state.eles[index] = ele }} className="todo-item" key={index}>
				<div className="view">
					<input type="checkbox" 
						onChange={this.handleChange.bind(this,item,index)}
						checked={item.completed} />
					<label 
						className={done} 
						onDoubleClick={(e) => this.showEditInput(e, index, item)}
					>{ item.text }</label>
					<button onClick={() => this.props.deleteItem(index)}></button>
				</div>
				<input 
					value={this.state.editText}
					onKeyDown={(e) => this.handleEditEnd(e,index)}
					onBlur={() => this.hideEditInput(index)}
					onChange={(e) => this.handleEditing(e)}
					className="edit" type="text" />
			</li>
		);
	}

	render() {
		let { todos } = this.props;
		console.clear();
		console.log(JSON.stringify(todos, null, 4));

		if(todos.length === 0) {
			return (
				<div>nothing...</div>
			)
		} else {
			return (
				<ul className="todo-items">
					{ todos.map((item,index) => this.renderItem(item,index)) }
				</ul>
			); 
		}
	}
}