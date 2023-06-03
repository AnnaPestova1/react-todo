import React from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoList from "../TodoList/TodoList";
import style from "./TodoContainer.module.css";
import PropTypes from "prop-types";

/*The component that works with API and adds, deletes and fetches the data from there */

function TodoContainer({ tableName, baseName, apiKey }) {
  const [todoList, setTodoList] = React.useState([]);

  /*hook that help to appear the "loading..." message in the add during waiting fetching data */
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
    const newTodoList = [...todoList];
    newTodoList.sort(sortData);
    setTodoList(newTodoList);
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
    const newTodoList = [...todoList];
    newTodoList.sort(sortData);
    setTodoList(newTodoList);
  };

  const onSortByDate = () => {
    function sortData(a, b) {
      return new Date(b.createdDate) - new Date(a.createdDate);
    }
    const newTodoList = [...todoList];
    newTodoList.sort(sortData);
    setTodoList(newTodoList);
  };

  const onSortByDateDes = () => {
    function sortData(a, b) {
      return new Date(a.createdDate) - new Date(b.createdDate);
    }
    const newTodoList = [...todoList];
    newTodoList.sort(sortData);
    setTodoList(newTodoList);
  };

  /*getting the infirmation from remote site*/
  const fetchData = async () => {
    //const url = `https://api.airtable.com/v0/${baseName}/${tableName}?view=Grid%20view`;
    // const url = `https://api.airtable.com/v0/${baseName}/${tableName}?sort[0][field]=title&[direction]=asc`;
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

      // function sortData(a, b) {
      //   if (a.title > b.title) {
      //     return 1;
      //   }
      //   if (a.title < b.title) {
      //     return -1;
      //   }
      //   return 0;
      // }

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
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /*hook that fetching data from API */
  React.useEffect(() => {
    fetchData();
  }, [tableName]);

  /*posting new todo on remote site*/
  const addTodo = async (title, createdDate) => {
    const postTitle = {
      fields: {
        title: title,
      },
    };
    // console.log(postTitle);
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
      console.log(newTodo);
      setTodoList([...todoList, newTodo]);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  /*function for removing todo item from remote site*/

  const removeTodo = async (id) => {
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
    <>
      <h1 className={style.TodoList}>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p className={style.Loading}>Loading ...</p>
      ) : todoList.length ? (
        <TodoList
          todoList={todoList}
          onSortByTitle={onSortByTitle}
          onSortByTitleDes={onSortByTitleDes}
          onSortByDate={onSortByDate}
          onSortByDateDes={onSortByDateDes}
          onRemoveTodo={removeTodo}
        />
      ) : (
        <h2 className={style.GoodJob}>Good job!</h2>
      )}
    </>
  );
}
TodoContainer.propTypes = {
  tableName: PropTypes.string,
  baseName: PropTypes.string,
  apiKey: PropTypes.string,
};
export default TodoContainer;
