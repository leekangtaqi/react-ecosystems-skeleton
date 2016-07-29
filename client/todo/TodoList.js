import React from 'react';
import Todo from './Todo';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { addTodo, toggleTodo, doSomeRoute, toggleFilter } from './todo.actions';
import classNames from 'classnames';

class TodoList extends React.Component {
    static fetchData({ store }){
        return store.dispatch(addTodo('hehe'));
    }
    constructor(props, context){
        super(props, context);
    }
    onAddTodo(){
        this.props.addTodo(this.refs.newTodo.value);
        this.refs.newTodo.value = "";
    }
    jump(){
        this.props.doSomeRoute();
    }
    render(){
        return(
            <div>
                <input type="text" placeholder="add todo" ref="newTodo"/>
                <input onClick={this.onAddTodo.bind(this)} type="button" value="add"/>
                <ul>
                    {this.props.todos.filter(t=>{
                        switch (this.props.visibilityFilter) {
                            case 'SHOW_ALL':
                                return true;
                            case 'SHOW_DONE':
                                return t.get('isDone');
                            case 'SHOW_TODOS':
                                return !t.get('isDone');
                        }
                    }).map(t=>(
                        <li key={t.get('id')} onClick={this.props.toggleTodo(t.get('id'))}>
                            <Todo todo={t}/>
                        </li>
                    ))}
                </ul>
                <ul>
                    <li className={classNames({fontRed: this.props.visibilityFilter == 'SHOW_ALL', backgroundBlue: true})} onClick={this.props.toggleFilter('SHOW_ALL')}>SHOW_ALL</li>
                    <li className={classNames({fontRed: this.props.visibilityFilter == 'SHOW_DONE', backgroundBlue: true})} onClick={this.props.toggleFilter('SHOW_DONE')}>SHOW_DONE</li>
                    <li className={classNames({fontRed: this.props.visibilityFilter == 'SHOW_TODOS', backgroundBlue: true})} onClick={this.props.toggleFilter('SHOW_TODOS')}>SHOW_TODOS</li>
                </ul>
                <ul>
                    <li><Link to="/nest1">跳转1</Link></li>
                    <li><Link to={{pathname: '/nest2', query: {'q': 'something'}}}>跳转2</Link></li>
                    <li><a href="javascript:void(0)" onClick={this.jump.bind(this)}>跳转3</a></li>
                </ul>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

var App = connect(
    function mapStateToProps(state, ownProps){
        return {
            todos: state.todos,
            visibilityFilter: state.visibilityFilter,
            query: ownProps.location.query
        }
    },
    function mapDispatchToProps(dispatch){
        return {
            addTodo: text => dispatch(addTodo(text)),
            toggleTodo: id => () => dispatch(toggleTodo(id)),
            doSomeRoute: ()=> dispatch(doSomeRoute()),
            toggleFilter: text=> () => dispatch(toggleFilter(text))
        }
    }
)(TodoList);

export { App as default };