import React from 'react';

class Todo extends React.Component {
    render(){
        const todo = this.props.todo;
        if(this.props.todo.get('isDone')){
            return <strike>{todo.get('text')}</strike>
        }else{
            return <span>{todo.get('text')}</span>
        }
    }
}
export { Todo as default };