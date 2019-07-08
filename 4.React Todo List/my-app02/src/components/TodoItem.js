import React, { Component } from 'react'
export default class TodoItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: this.props.name
        }
    }
    toggleComplete() {
        this.props.toggleComplete(this.props.taskId)
    }
    handleRemove() {
        this.props.removeTask(this.props.taskId)
    }
    render() {
        var taskId      = this.props.taskId,
            name        = this.props.name,
            isCompleted = this.props.isCompleted;
        // 选中与不选中状态样式
        var finish = {
            backgroundColor: '#DFFCB5',
            color:"green"
            // textDecoration: 'line-through'
        }  
        var unfinish = {
			backgroundColor: '#f7f7f7'
		};  
        var liItemStyle=isCompleted ? finish : unfinish;
        return (
            <li key={taskId} style={liItemStyle}>
                <label>
                    <input type="checkbox" checked={isCompleted} onChange={this.toggleComplete.bind(this)} />&nbsp;&nbsp;
                    <ItemContext context={name} isCompleted={isCompleted}/>
                    {/* <span>{name}</span> */}
                </label>
                <span className="delete-btn" onClick={this.handleRemove.bind(this)}>删除</span>
            </li>
        )
    }
}
class ItemContext extends React.Component{
    render(){
        return (this.props.isCompleted ? <span><del>{this.props.context}</del></span> : <span>{this.props.context}</span>);
    }
}