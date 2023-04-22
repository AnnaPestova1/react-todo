import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  /*hook that help to appear new todo in list*/

  const [todoList, setTodoList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  /*hook that response for mimic API fetch*/

  React.useEffect(() => {
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          resolve({
            data: {
              todoList: JSON.parse(localStorage.getItem("savedTodoList")),
            },
          }),
        2000
      )
    ).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  /*hook that save new todo in local storage and load it fron there after reloading page*/
  React.useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  /*function for removing todo item */
  function removeTodo(id) {
    const newTodoList = todoList.filter(function (todo) {
      return id !== todo.id;
    });
    setTodoList(newTodoList);
  }

  /*function that adds a new todo to the list */
  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
