import React from "react";
import List from "./list";

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: [],
      inputValue: ""
    };
    this.input = React.createRef();
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
    const { inputValue, toDoList } = this.state;
    return (
      <div className="to-do-container">
        <input
          autoFocus
          value={inputValue}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeypress}
          type="text"
          ref={this.input}
        />
        <button
          onClick={this.handleAdding}
          disabled={inputValue === "" ? true : false}
        >
          Add
        </button>
        <List handleDelete={this.handleDelete} list={toDoList} />
      </div>
    );
  }
}
