import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TodoList from './components/TodoList'
import './App.css'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }
//生成id值
  generateId() {
    return Math.floor(Math.random() * 1000) + 1000;
  }
// 状态切换处理：根据指定Id值，进行状态反转
  handleToggleComplete(taskId) {
    var todos = this.state.todos
    for (var i in todos) {
      if (todos[i].id === taskId) {
        todos[i].isCompleted = !todos[i].isCompleted
        break;
      }
    }
    this.setState({ todos })
  }
  // 任务删除处理:根据指定id值，对Todos进行过滤
  handleRemoveTask(taskId) {
    var todos = this.state.todos
    todos = this.state.todos.filter((task) => {
      return task.id !== taskId
    })
    this.setState({ todos })
  }
  // 任务添加处理，将新建任务项添加到了todos数组中，还未显示。
  handleAdd() {
    var taskName = ReactDOM.findDOMNode(this.refs.taskname).value.trim();//用来获取输入框的内容值
    if (!taskName) {return ''}
    var taskId = this.generateId();
    var todos  = this.state.todos;
    this.setState({
      todos:todos.concat({ id: taskId, name: taskName, isCompleted: false })
    });
    ReactDOM.findDOMNode(this.refs.taskname).value='';
  }
  handleEnterKey(e){
    if(e.nativeEvent.keyCode === 13){
      this.handleAdd();
    }
  }
  render() {
    const statistics = {
      todoCount: this.state.todos.length || 0,
      todoCompleteCount: this.state.todos.filter(todo => todo.isCompleted).length
    }
    return (
      <div className="container">
        <h1>React Todo</h1>

        <TodoList todos={this.state.todos} removeTask={this.handleRemoveTask.bind(this)} toggleComplete={this.handleToggleComplete.bind(this)} />

        <div className="tongji">{statistics.todoCompleteCount}已完成 / {statistics.todoCount}总数</div>

        <div className="interaction">
          <div>
            <label htmlFor="inputId">Task</label>&nbsp;&nbsp;
            <input id="inputId" type="text" ref="taskname" placeholder="你想做点什么" onKeyPress={this.handleEnterKey.bind(this)}/>   {/* 这里的input没有使用改变事件处理函数，而是使用了ref */}
          </div>
          <div>
            <button className="saveButton" onClick={this.handleAdd.bind(this)}>Save Task</button>
          </div>
        </div>  
      </div>
    );
  }
}
export default App;
