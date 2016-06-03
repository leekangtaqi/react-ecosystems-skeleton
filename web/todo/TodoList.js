import React from 'react';
import Todo from './Todo';
import Nest1 from './Nest1';
import Nest2 from './Nest2';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { push } from 'react-router-redux'
import { addTodo, toggleTodo, doSomeRoute } from './todo.actions';

class TodoList extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state={
            test: 0
        };
    };
    componentDidMount(){
        console.log("mounted***********");
    };
    shouldComponentUpdate(nextProps, nextState){
        return true;
    };
    onAddTodo(){
        this.props.addTodo(this.refs.newTodo.value);
        this.refs.newTodo.value = "";
    };
    onDoneTodo(id){
        return function(e){
            this.props.toggleTodo(id);
        }.bind(this)
    };
    jump(){
        this.props.doSomeRoute();
    };
    render(){
        return(
            <div>
                <input type="text" placeholder="add todo" ref="newTodo"/>
                <input onClick={this.onAddTodo.bind(this)} type="button" value="add"/>
                <ul>
                    {this.props.todos.map(t=>(
                        <li key={t.get('id')} onClick={this.onDoneTodo(t.get('id'))}>
                            <Todo todo={t}/>
                        </li>
                    ))}
                </ul>
                <ul>
                    <li><Link to="/nest1">跳转1</Link></li>
                    <li><Link to={{pathname: '/nest2', query: {'q': 'something'}}}>跳转3</Link></li>
                    <li><a onClick={this.jump.bind(this)}>跳转三</a></li>
                </ul>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

var App = connect(
    function mapStateToProps(state){
        return {
            todos: state.todos
        }
    },
    function mapDispatchToProps(dispatch){
        return {
            addTodo: text => dispatch(addTodo(text)),
            toggleTodo: id => dispatch(toggleTodo(id)),
            doSomeRoute: ()=> dispatch(doSomeRoute()),
            push
        }
    }
)(TodoList);

export { App as default };