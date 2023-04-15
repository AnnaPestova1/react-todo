import React from "react";
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
  /* controlled input form for adding new todo and submit button*/

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title </label>
      <input
        id="todoTitle"
        type="text"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}
export default AddTodoForm;
