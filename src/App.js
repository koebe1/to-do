import React from "react";
import "./App.css";

function List(props) {
  const list = props.list;

  return (
    <ul>
      {list.map((listItem, index) => {
        return (
          <li key={index} className="listItem">
            {listItem}
          </li>
        );
      })}
    </ul>
  );
}

class ToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: [],
      inputValue: ""
    };
  }

  handleInputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  handleAdding = () => {
    this.setState({
      toDoList: [...this.state.toDoList, this.state.inputValue],
      inputValue: ""
    });
  };
  render() {
    const { inputValue, toDoList } = this.state;
    return (
      <div className="to-do-container">
        <input
          value={inputValue}
          onChange={this.handleInputChange}
          type="text"
        />
        <button
          onClick={this.handleAdding}
          disabled={inputValue === "" ? true : false}
        >
          Add
        </button>
        <List list={toDoList} />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

export default App;
