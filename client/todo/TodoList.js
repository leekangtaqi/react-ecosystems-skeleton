import React from 'react';
import Todo from './Todo';
import {connect} from 'react-redux';
import {Link} from 'react-router';
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
        addTodo: text => dispatch(addTodo(text)),
        toggleTodo: id => () => dispatch(toggleTodo(id)),
        doSomeRoute: ()=> dispatch(doSomeRoute()),
        toggleFilter: text=> () => dispatch(toggleFilter(text))
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
                    {this.props.todos.map(t => (
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