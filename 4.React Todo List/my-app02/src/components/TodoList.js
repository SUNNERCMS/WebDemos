import React, { Component } from 'react'
import TodoItem from './TodoItem'
export default class TodoList extends Component {
    render() {
        return (
            <ul>
                {
        // <TodoList todos={this.state.todos} removeTask={this.handleRemoveTask.bind(this)} toggleComplete={this.handleToggleComplete.bind(this)} />
                    // 遍历todos数组中的每一项，每一项都是一个对象，包括，id值，任务内容name，任务状态isCompleted
                    this.props.todos.map(todo => {
                        return (
                            <TodoItem
                                key={todo.id}
                                taskId={todo.id}
                                name={todo.name}
                                isCompleted={todo.isCompleted}
                                removeTask={this.props.removeTask}
                                toggleComplete={this.props.toggleComplete} 
                            />
                        )
                    })
                }
            </ul>
        )
    }
}