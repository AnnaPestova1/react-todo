import React from "react";
import Button from "../../Button";
import { ReactComponent as Add } from "../../../img/add_black_24dp.svg";

function FetchListItem({ book, setBooks, addToRead }) {
  //   function onAddBook(book) {
  //     console.log(book);
  // event.preventDefault();
  // if (todoTitle === "") {
  //   return;
  // }
  // console.log(todoTitle);
  // /*the onAddTodo callback prop to pass an Object*/
  // onAddTodo(todoTitle);
  // /*reset the todoTitle state to an empty String*/
  // setTodoTitle("");
  //}
  return (
    <li>
      <span>
        {book.volumeInfo.imageLinks ? (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
        ) : (
          <span />
        )}
      </span>

      <span>{book.volumeInfo.title}</span>
      <span>
        {book.volumeInfo.authors
          ? book.volumeInfo.authors && book.volumeInfo.authors.join(", ")
          : ""}
      </span>
      <Button
        type="submit"
        title="add book in my list"
        onClick={() => addToRead(book)}
      >
        <Add />
      </Button>
    </li>
  );
}

export default FetchListItem;
