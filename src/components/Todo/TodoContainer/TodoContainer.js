import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import InputWithLabel from "../../InputWithLabel";
import Button from "../../Button/Button";
import Loader from "../../Loader/Loader";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoList from "../TodoList/TodoList";
import SortTodo from "../SortTodo/SortTodo";
import style from "./TodoContainer.module.css";

//The component that works with API and get, add and delete todos from Airtable, sorting todos
function TodoContainer({ tableName, baseName, apiKey }) {
  const [todoList, setTodoList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [sortDirection, setSortDirection] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editTodoTitle, setEditTodoTitle] = useState("");
  const [editedTodo, setEditedTodo] = useState({});

  //changing background for Todo page
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/todo") {
      document.body.style.backgroundImage = "url('./IMG_4835.jpeg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "left";
    }
  }, []);

  // functions to sort todos
  const onSortByTitle = () => {
    function sortData(a, b) {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    }
    setTodoList((oldTodoList) => [...oldTodoList].sort(sortData));
  };

  const onSortByTitleDes = () => {
    function sortData(a, b) {
      if (a.title < b.title) {
        return 1;
      }
      if (a.title > b.title) {
        return -1;
      }
      return 0;
    }
    setTodoList((oldTodoList) => [...oldTodoList].sort(sortData));
  };

  const onSortByDate = () => {
    function sortData(a, b) {
      return new Date(b.createdDate) - new Date(a.createdDate);
    }
    setTodoList((oldTodoList) => [...oldTodoList].sort(sortData));
  };

  const onSortByDateDes = () => {
    function sortData(a, b) {
      return new Date(a.createdDate) - new Date(b.createdDate);
    }
    setTodoList((oldTodoList) => [...oldTodoList].sort(sortData));
  };

  const sortList = (sortDirection) => {
    switch (sortDirection) {
      case "titleAsc":
        onSortByTitle();
        break;
      case "titleDesc":
        onSortByTitleDes();
        break;
      case "dateAsc":
        onSortByDate();
        break;
      case "dateDesc":
        onSortByDateDes();
        break;
      default:
        onSortByDate();
    }
    setSortDirection(sortDirection);
  };

  const handleEditButton = (id) => {
    const currentEditedItem = todoList.find(function (todo) {
      return id === todo.id;
    });
    const editTodoItem = currentEditedItem.title;

    setEditTodoTitle(editTodoItem);
    setEditedTodo(currentEditedItem);
    setIsEditing(true);
  };

  // takes value from input
  function handleEditTitleChange(event) {
    const editTodoTitle = event.target.value;
    setEditTodoTitle(editTodoTitle);
  }

  //getting todos from Airtable
  const fetchData = async (tableName) => {
    const url = `https://api.airtable.com/v0/${baseName}/${tableName}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      const todos = data.records.map((todo) => {
        const d = new Date(todo.createdTime);
        const date = d.toLocaleDateString("en-EN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return {
          id: todo.id,
          createdDate: date,
          title: todo.fields.title,
        };
      });

      setTodoList(todos);
      sortList(sortDirection);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData(tableName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName]);

  //adding new todo in Airtable
  const addTodo = async (title) => {
    const postTitle = {
      fields: {
        title: title,
      },
    };
    console.log(postTitle);
    const url = `https://api.airtable.com/v0/${baseName}/${tableName}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(postTitle),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error has ocurred: ${response.status}`);
      }
      const todo = await response.json();
      const d = new Date(todo.createdTime);
      const date = d.toLocaleDateString("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const newTodo = {
        id: todo.id,
        title: todo.fields.title,
        createdDate: date,
      };
      setTodoList((oldTodoList) => [...oldTodoList, newTodo]);
      sortList(sortDirection);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  //editing todo in Airtable
  const editTodoItem = async (title, id, event) => {
    event.preventDefault();
    const editedItem = {
      fields: {
        title: title,
      },
    };
    const url = `https://api.airtable.com/v0/${baseName}/${tableName}/${id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(editedItem),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error has ocurred: ${response.status}`);
      }
      const newEditedTodo = {
        id,
        title,
        createdDate: editedTodo.createdDate,
      };
      setIsEditing(false);
      const newTodoList = todoList.filter(function (todo) {
        return id !== todo.id;
      });
      setTodoList(newTodoList);
      setTodoList((oldTodoList) => [...oldTodoList, newEditedTodo]);
      sortList(sortDirection);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  //remove todo item from Airtable
  const removeTodo = async (id) => {
    console.log(id);
    const url = `https://api.airtable.com/v0/${baseName}/${tableName}/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error has ocurred: ${response.status}`);
      }
      const newTodoList = todoList.filter(function (todo) {
        return id !== todo.id;
      });
      setTodoList(newTodoList);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  return (
    <div className={style.TodoContainer}>
      <h1 className={style.TodoTitle}>{tableName}</h1>
      {isEditing ? (
        <>
          <form
            onSubmit={(event) =>
              editTodoItem(editTodoTitle, editedTodo.id, event)
            }
          >
            <InputWithLabel
              id="todoTitle"
              value={editTodoTitle}
              onInputChange={handleEditTitleChange}
            >
              <strong>Title:</strong>
            </InputWithLabel>
            <Button type="submit" title="edit to do">
              Submit
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </form>
        </>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          {isLoading ? (
            <p className={style.Loading}>
              <Loader />
            </p>
          ) : todoList.length ? (
            <>
              <SortTodo sortList={sortList} sortDirection={sortDirection} />
              <TodoList
                todoList={todoList}
                onEditTodo={handleEditButton}
                onRemoveTodo={removeTodo}
              />
            </>
          ) : (
            <h2 className={style.GoodJob}>Good job!</h2>
          )}
        </>
      )}
    </div>
  );
}
TodoContainer.propTypes = {
  tableName: PropTypes.string,
  baseName: PropTypes.string,
  apiKey: PropTypes.string,
};
export default TodoContainer;
