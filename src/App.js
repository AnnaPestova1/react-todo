import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

/*custom hook that help to appear new todo in list and keep it there after reloading page*/
function useSemiPersistentState() {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );
  console.log(localStorage);
  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);
  return [todoList, setTodoList];
}

function App() {
  /*using custom hook*/
  const [todoList, setTodoList] = useSemiPersistentState();

  /*function that adds a new todo to the list */
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
