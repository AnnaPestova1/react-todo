import React from "react";
import FetchListItem from "../FetchListItem/FetchListItem";
import Button from "../../Button";
import { ReactComponent as Add } from "../../../img/add_black_24dp.svg";
import style from "./FetchList.module.css";
import PropTypes from "prop-types";

function FetchList({ books, setBooks, addToRead }) {
  // function handleAddToRead(event) {
  //   console.log(event);
  //   event.preventDefault();
  //   // if (todoTitle === "") {
  //   //   return;
  //   // }
  //   console.log(book);
  //   /*the onAddTodo callback prop to pass an Object*/
  //   addToRead(books);
  //   /*reset the todoTitle state to an empty String*/
  // }
  // console.log(books);
  return (
    <>
      {books.map((book) => (
        <FetchListItem
          key={book.id}
          book={book}
          setBooks={setBooks}
          addToRead={addToRead}
        />
        // <li key={book.id}>
        //   <span>
        //     {book.volumeInfo.imageLinks ? (
        //       <img
        //         src={book.volumeInfo.imageLinks.thumbnail}
        //         alt={book.volumeInfo.title}
        //       />
        //     ) : (
        //       <span />
        //     )}
        //   </span>

        //   <span>{book.volumeInfo.title}</span>
        //   <span>
        //     {book.volumeInfo.authors
        //       ? book.volumeInfo.authors && book.volumeInfo.authors.join(", ")
        //       : ""}
        //   </span>
        //   <Button
        //     type="submit"
        //     title="add book in my list"
        //     onClick={(book) => setBooks(book)}
        //   >
        //     <Add />
        //   </Button>
        // </li>
      ))}
    </>
  );
}
// FetchList.propTypes = {
//   books: PropTypes.array,
//   setBooks: PropTypes.func,
//   addToRead: PropTypes.func,
// };

export default FetchList;
