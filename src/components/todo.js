import React from "react";
import List from "./list";

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);

    // retrieve to do list from local storage if ther is a value
    // -> empty string otherwise
    this.state = {
      toDoList: localStorage.getItem("toDoList")
        ? localStorage.getItem("toDoList").split(",")
        : [],

      inputValue: ""
    };
    this.input = React.createRef();
  }
  //   save to do list in local storage
  componentDidUpdate() {
    localStorage.setItem("toDoList", this.state.toDoList);
  }

  focusInput = () => {
    this.input.current.focus();
  };
  //   display changes to the input field
  handleInputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };
  //   add to do by hitting enter
  handleKeypress = event => {
    if (event.key === "Enter") {
      this.handleAdding();
    }
  };
  //   add inputValue to list if user entered a value
  handleAdding = () => {
    if (this.state.inputValue !== "") {
      this.setState({
        toDoList: [...this.state.toDoList, this.state.inputValue],
        inputValue: ""
      });
      //   add to local storage after toDoList was updated
    }
    this.focusInput();
  };

  handleDelete = index => {
    //   remove list item from previus state
    const newToDoList = [...this.state.toDoList];
    newToDoList.splice(index, 1);
    this.setState({
      toDoList: newToDoList
    });
  };

  render() {
    // const saved = localStorage.getItem("toDoList");
    const { inputValue, toDoList } = this.state;
    return (
      <div className="to-do-container">
        <div className="input-container">
          <h1>To Do List</h1>
          <div>
            <input
            className="input"
              autoFocus
              value={inputValue}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeypress}
              type="text"
              ref={this.input}
            />
            <button
              className="btn-add"
              onClick={this.handleAdding}
              disabled={inputValue === "" ? true : false}
            >
              Add
            </button>
          </div>
          <List handleDelete={this.handleDelete} list={toDoList} />
        </div>
      </div>
    );
  }
}
