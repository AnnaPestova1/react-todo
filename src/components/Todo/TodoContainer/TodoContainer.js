import React from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoList from "../TodoList/TodoList";
import style from "./TodoContainer.module.css";
import PropTypes from "prop-types";
import InputWithLabel from "../../InputWithLabel";
import SortTodo from "../SortTodo/SortTodo";
import Button from "../../Button";

/*The component that works with API and adds, deletes and fetches the data from there */

function TodoContainer({ tableName, baseName, apiKey }) {
  const [todoList, setTodoList] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);

  const [sortDirection, setSortDirection] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
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
    // const [currentTodo, setCurrentTodo] = React.useState({});

    /*hook that help to appear the "loading..." message in the add during waiting fetching data */
  };
  // const handleEditInputChange = (event) => {
  //   setCurrentTodo({ ...currentTodo, text: event.target.value });
  // };

  // const handleUpdateTodo = (id, updatedTodo) => {
  //   const updatedItem = todoList.map((todo) => {
  //     return todo.id === id ? updatedTodo : todo;
  //   });
  //   //console.log(updatedItem);
  //   setIsEditing(false);
  //   setTodoList([...todoList, updatedItem]);
  // };
  // const handleEditFormSubmit = (event) => {
  //   event.preventDefault();
  //   handleUpdateTodo(currentTodo.id, currentTodo);
  // };
  const [editTodoTitle, setEditTodoTitle] = React.useState("");
  const [editedTodo, setEditedTodo] = React.useState({});
  const handleEditButton = (id) => {
    const currentEditedItem = todoList.find(function (todo) {
      //console.log(todo.title);
      return id === todo.id;
    });
    console.log(currentEditedItem);
    const editTodoItem = currentEditedItem.title;

    setEditTodoTitle(editTodoItem);
    setEditedTodo(currentEditedItem);
    setIsEditing(true);
  };

  /* function that takes value from input as a parameter*/
  function handleEditTitleChange(event) {
    const editTodoTitle = event.target.value;
    console.log(editTodoTitle);
    setEditTodoTitle(editTodoTitle);
  }
  /*function that work with value after submitting the form*/

  /*getting the infirmation from remote site*/
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
      console.log(url);
      console.log(data);

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

      //setTodoList(todos.sort(sortData));
      setTodoList(todos);

      sortList(sortDirection);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /*hook that fetching data from API */
  React.useEffect(() => {
    fetchData(tableName);
    // console.log(fetchData(tableName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName]);

  /*posting new todo on remote site*/
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
      console.log(todo);
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
      console.log(newTodo);

      setTodoList((oldTodoList) => [...oldTodoList, newTodo]);

      sortList(sortDirection);
      console.log(sortDirection);
      console.log(todoList);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const editTodoItem = async (title, id, event) => {
    event.preventDefault();
    console.log(event);
    console.log(todoList);
    console.log(editedTodo);
    // console.log(id);
    // console.log(title);
    // id: todo.id,
    //     title: todo.fields.title,
    //     createdDate: date,

    const editedItem = {
      fields: {
        title: title,
      },
    };
    console.log(editedItem);
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
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error has ocurred: ${response.status}`);
      }
      console.log(response);
      console.log(editedTodo);
      const newEditedTodo = {
        id,
        title,
        createdDate: editedTodo.createdDate,
      };
      // const newEditedTodo = { ...editedTodo, title: title };
      // const todo = await response.json();

      console.log(newEditedTodo);

      // const currentEditedItem = todoList.filter(function (todo) {
      //   //console.log(todo.title);
      // if (editedItem.id === todo.id && editedItem.fields.title!==todo.fields.title)
      //

      // const editTodoItem = currentEditedItem.map(function (todo) {
      //   return todo.title;
      // });

      // console.log(editTodoItem.join());
      // setEditTodoTitle(editTodoItem.join());
      // //console.log(editTodoItem);

      setIsEditing(false);
      const newTodoList = todoList.filter(function (todo) {
        return id !== todo.id;
      });
      setTodoList(newTodoList);
      setTodoList((oldTodoList) => [...oldTodoList, newEditedTodo]);
      sortList(sortDirection);
      //console.log(todoList);

      //console.log(editTodoList);

      //setEditing(true);

      //   setTodoList((oldTodoList) => [...oldTodoList, editTodoTitle]);
      //   console.log(TodoList);
      //   setIsEditing(false);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
  /*function for removing todo item from remote site*/

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
    <div className={style.TodoTableName}>
      <h1>{tableName}</h1>
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
            <p className={style.Loading}>Loading ...</p>
          ) : todoList.length ? (
            <>
              <SortTodo
                todoList={todoList}
                sortList={sortList}
                setTodoList={setTodoList}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
              />
              <TodoList
                todoList={todoList}
                onRemoveTodo={removeTodo}
                onEditTodo={handleEditButton}
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
