import React from 'react';
import Todo from './Todo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from './todo.actions';
import { addTodo, toggleTodo, doSomeRoute, toggleFilter } from './todo.actions';
import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getVisibleTodos } from './todo.selectors.js';

@connect(
    (state, ownProps) => ({
        todos: getVisibleTodos(state),
        visibilityFilter: state.visibilityFilter,
        query: ownProps.location.query
    }),
    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })
)
export default class TodoList extends React.Component {
    static propTypes = {
        todos: ImmutablePropTypes.list,
        visibilityFilter: React.PropTypes.string,
        children: React.PropTypes.element
    }

    static fetchData({ store }){
        return store.dispatch(addTodo('hehe1'));
    }
    constructor(props, context){
        super(props, context);
    }
    onAddTodo(){
        this.props.actions.addTodo(this.refs.newTodo.value);
        this.refs.newTodo.value = "";
    }
    jump(){
        this.props.actions.doSomeRoute();
    }
    render(){
        return(
            <div>
                <input type="text" placeholder="add todo" ref="newTodo"/>
                <input onClick={this.onAddTodo.bind(this)} type="button" value="add"/>
                <ul>
                    {this.props.todos.map(t => (
                        <li key={t.get('id')} onClick={() => {this.props.actions.toggleTodo(t.get('id'))}}>
                            <Todo todo={t}/>
                        </li>
                    ))}
                </ul>
                <ul>
                    <li className={classNames({fontRed: this.props.visibilityFilter == 'SHOW_ALL', backgroundBlue: true})} onClick={() => {this.props.actions.toggleFilter('SHOW_ALL')}}>SHOW_ALL</li>
                    <li className={classNames({fontRed: this.props.visibilityFilter == 'SHOW_DONE', backgroundBlue: true})} onClick={() => {this.props.actions.toggleFilter('SHOW_DONE')}}>SHOW_DONE</li>
                    <li className={classNames({fontRed: this.props.visibilityFilter == 'SHOW_TODOS', backgroundBlue: true})} onClick={() => {this.props.actions.toggleFilter('SHOW_TODOS')}}>SHOW_TODOS</li>
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