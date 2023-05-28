import React from "react";
import InputWithLabel from "../InputWithLabel";
import { ReactComponent as Add } from "../../img/add_black_24dp.svg";
import style from "./AddTodoForm.module.css";
import PropTypes from "prop-types";

/* component that takes user's input and sets new todo title*/
function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState("");

  /* function that takes value from input as a parameter*/
  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }
  /*function that work with value after submitting the form*/
  function handleAddTodo(event) {
    event.preventDefault();
    if (todoTitle === "") {
      return;
    }

    /*the onAddTodo callback prop to pass an Object*/
    onAddTodo(todoTitle);
    /*reset the todoTitle state to an empty String*/
    setTodoTitle("");
  }
  /* controlled form for adding new todo through InputWithLabel component and submit button*/

  return (
    <form onSubmit={handleAddTodo} className={style.AddTodoForm}>
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onInputChange={handleTitleChange}
      >
        <strong>Title:</strong>
      </InputWithLabel>
      <button type="submit" title="add to do">
        <Add />
      </button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};
export default AddTodoForm;
