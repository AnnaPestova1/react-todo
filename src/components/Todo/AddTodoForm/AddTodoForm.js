import React from "react";
import PropTypes from "prop-types";
import InputWithLabel from "../../InputWithLabel";
import Button from "../../Button/Button";
import { ReactComponent as Add } from "../../../img/add_black_24dp.svg";
import style from "./AddTodoForm.module.css";

// adding new todo in app
function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState("");

  function handleTitleChange(event) {
    console.log(event);
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    console.log(event);
    event.preventDefault();
    if (todoTitle === "") {
      return;
    }
    console.log(todoTitle);
    onAddTodo(todoTitle);
    setTodoTitle("");
  }

  return (
    <form onSubmit={handleAddTodo} className={style.AddTodoForm}>
      <InputWithLabel
        id="todoTitle"
        placeholder="add to do"
        value={todoTitle}
        onInputChange={handleTitleChange}
      >
        <strong>Title:</strong>
      </InputWithLabel>
      <Button type="submit" title="add to do">
        <Add />
      </Button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};
export default AddTodoForm;
