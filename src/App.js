import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
function App() {
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }
  // creating new state variable named todoList with setter setTodoList and default value of an empty Array
  const [todoList, setTodoList] = React.useState([]);
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
