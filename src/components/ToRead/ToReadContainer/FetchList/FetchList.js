import React from "react";

function FetchList({ books, setSelectedBook }) {
  return (
    <>
      {books.map((book) => (
        <li key={book.id}>
          <a
            title={book.volumeInfo.title}
            href="#"
            onClick={() => setSelectedBook(book.id)}
          >
            {book.volumeInfo.title}
          </a>
        </li>
      ))}
    </>
  );
}

export default FetchList;
