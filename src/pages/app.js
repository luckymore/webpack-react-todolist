import '../css/main.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';
// import { Router, Route, IndexRoute, hashHistory }   from 'react-router';
import localDb from 'localDb';
import TodoHeader from '../components/TodoHeader.js';
import TodoItems from '../components/TodoItems';
import TodoFooter from '../components/TodoFooter';

class App extends Component {
    constructor(props) {
        super(props);
        this.db = new localDb('todomvc');

        this.state = {
            todos: this.db.get('todos') || [],
            isAllChecked: false,
            currFilter: 'all'
        };

        this.toggleSelect   = this.toggleSelect.bind(this);
        this.addTodoItem    = this.addTodoItem.bind(this);
        this.deleteItem     = this.deleteItem.bind(this);
        this.checkedItem    = this.checkedItem.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        // this.showAll        = this.showAll.bind(this);
        // this.activeFilter   = this.activeFilter.bind(this);
        // this.completeFilter= this.completeFilter.bind(this);
        this.filterList     = this.filterList.bind(this);
        this.saveEdit       = this.saveEdit.bind(this);
    }

    isAllChecked() {
        let rest = this.state.todos.filter(function(v){return !v.completed})

        return rest.length === 0
    }

    toggleSelect() {
        let isAllChecked = this.state.isAllChecked;

        this.state.todos.map(function(v){v.completed = !isAllChecked})

        this.setState({
            todos: this.state.todos,
            isAllChecked: !isAllChecked
        });
    }

    addTodoItem(item) {
        if(this.state.currFilter === 'completed') item.display = false
        this.state.todos.push(item)
        this.setState({todos: this.state.todos})
        this.db.set('todos', this.state.todos)
    }

    deleteItem(index) {
        this.state.todos.splice(index, 1)
        this.setState({todos: this.state.todos})
        this.db.set('todos', this.state.todos)
    }

    saveEdit(index, v) {
        this.state.todos[index].text = v
        this.setState({todos: this.state.todos})
    }

    checkedItem(index, completed) {
        let f = this.state.currFilter,
            t = this.state.todos[index];

        t.completed = !completed;
        if(f === 'active') {
            t.display = t.completed ? false : true
        } else if(f === 'completed'){
            t.display = t.completed ? true : false
        }
        this.setState({todos: this.state.todos})
        this.db.set('todos', this.state.todos)
        this.isAllChecked() ? this.setState({isAllChecked: true}) : this.setState({isAllChecked: false})
    }

    clearCompleted() {
        this.setState({todos: this.state.todos.filter(function (v) {return !v.completed})})
        this.db.set('todos', this.state.todos)
    }

    // showAll() {
    //     this.state.currFilter = 'all'
    //     this.state.todos.map(todo => todo.display = true)
    //     this.setState({todos: this.state.todos})
    //     this.db.set('todos', this.state.todos)
    // }

    // activeFilter() {
    //     this.state.currFilter = 'active'
    //     this.state.todos.map(todo => todo.display = todo.completed ? false : true)
    //     this.setState({todos: this.state.todos})
    //     this.db.set('todos', this.state.todos)
    // }

    // completeFilter() {
    //     this.state.currFilter = 'completed'
    //     this.state.todos.map(todo => todo.display = todo.completed ? true : false)
    //     this.setState({todos: this.state.todos})
    //     this.db.set('todos', this.state.todos)
    // }
    filterList(filter) {

        switch(filter) {
            case 'all':
                this.state.todos.map(todo => todo.display = true);
                break;
            case 'active':
                this.state.todos.map(todo => todo.display = todo.completed ? false : true);
                break;
            case 'completed':
                this.state.todos.map(todo => todo.display = todo.completed ? true : false);
                break;
        }
        
        this.setState({currFilter: filter})
        this.setState({todos: this.state.todos})
        this.db.set('todos', this.state.todos)
    }

    render() {
        let info = {
            isAllChecked: this.state.isAllChecked,
            total: this.state.todos.length || 0,
            rest: (this.state.todos && this.state.todos.filter((todo) => todo.completed)).length || 0,
            filter: this.state.currFilter
        };

        return (
            <div className="todo-wrap">
                <TodoHeader addTodoItem={this.addTodoItem} />
                <TodoItems 
                    todos={this.state.todos} 
                    deleteItem={this.deleteItem} 
                    saveEdit={this.saveEdit}
                    checkedItem={this.checkedItem}
                />
                <TodoFooter {...info}
                    filterList={this.filterList}
                    clearCompleted={this.clearCompleted}
                    toggleSelect={this.toggleSelect}
                    />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));