import React from "react";
import InputWithLabel from "./InputWithLabel";

/* component that takes user's input and sets new todo title*/
function AddTodoForm({ onAddTodo }) {
  /*hook that let to add changes in todoTitle*/
  const [todoTitle, setTodoTitle] = React.useState("");

  /* function that takes value from input as a parameter*/
  function handleTitleChange(event) {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }
  /*function that wotk with value after submitting the form*/
  function handleAddTodo(event) {
    console.log(event);
    event.preventDefault();
    console.log(todoTitle);
    /*the onAddTodo callback prop to pass an Object*/
    onAddTodo({ title: todoTitle, id: Date.now() });
    /*reset the todoTitle state to an empty String*/
    setTodoTitle("");
  }
  /* controlled form for adding new todo through InputWithLabel component and submit button*/

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onInputChange={handleTitleChange}
      >
        <strong>Title:</strong>
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
}
export default AddTodoForm;
