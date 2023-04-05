import React from "react";
// dealing with new todo comes through the form
// updated props to use destructuring
function AddTodoForm({ onAddTodo }) {
  //creating new state variable named todoTitle with setter setTodoTitle
  const [todoTitle, setTodoTitle] = React.useState("");

  // declared a new function named handleTitleChange that takes event as a parameter
  function handleTitleChange(event) {
    // console.log(event);
    // prevents the submit button from refreshing the page
    event.preventDefault();
    //retrieve the input value from the event object and store in variable named newTodoTitle
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    console.log(event);
    event.preventDefault();
    console.log(todoTitle);
    /* invoke onAddTodo callback handler to pass todoTitle state variable.
    the onAddTodo callback prop to pass an Object.
    */
    onAddTodo({ title: todoTitle, id: Date.now() });
    // reset the todoTitle state to an empty String
    setTodoTitle("");
  }
  // input form for adding new todo and submit button
  // the <input> element modifyed to be a controlled input
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
