import React, { useState } from "react";
import PropTypes from "prop-types";
import ToReadList from "../ToReadList/ToReadList";
import FetchList from "../FetchList/FetchList";
import SearchBookForm from "../SearchBookForm/SearchBookForm";
import style from "./ToReadContainer.module.css";

//The component that works with API and get, add and delete books from Airtable and get books from Google
function ToReadContainer({ tableBooksName, baseName, apiKey }) {
  //books from Airtable
  const [toReadList, setToReadList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [search, setSearch] = useState("");
  //books from Google Books
  const [books, setBooks] = useState([]);
  //amount of loading pages from Google
  const [totalPages, setTotalPages] = useState(0);
  //showing page from Google
  const [page, setPage] = useState(1);
  //limit books per page from Google
  const limit = 10;

  //changing background for ToRead page
  React.useEffect(() => {
    if (window.location.pathname === "/toread") {
      document.body.style.backgroundImage = "url('./IMG_4911.jpeg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  }, []);

  //fetch books from Airtable
  const fetchData = async (tableBooksName) => {
    const url = `https://api.airtable.com/v0/${baseName}/${tableBooksName}`;
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
      const toRead = data.records.map((toRead) => {
        return {
          id: toRead.id,
          Name: toRead.fields.Name,
          Author: toRead.fields.Author,
        };
      });
      setToReadList(toRead);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    fetchData(tableBooksName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableBooksName]);

  // fetch books from Google Books
  const fetchBook = async (search, page, limit) => {
    const startIndex = (page - 1) * limit;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&&startIndex=${startIndex}&&maxResult=${limit}`;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data.items);
      const totalCount = data.totalItems;
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (error) {
      console.log(error.message);
    }
  };

  //workind with pagination
  React.useEffect(() => {
    if (isAddingBook === true && search !== "") {
      fetchBook(search, page, limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddingBook, page]);

  //add book from Google Books to Airtable
  const addToRead = async (book) => {
    console.log(book);
    const postBook = {
      fields: {
        Name: book.volumeInfo.title,
        Author: book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : " ",
      },
    };
    console.log(postBook);
    const url = `https://api.airtable.com/v0/${baseName}/${tableBooksName}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(postBook),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error has ocurred: ${response.status}`);
      }
      const toRead = await response.json();
      const newBook = {
        id: toRead.id,
        Name: toRead.fields.Name,
        Author: toRead.fields.Author,
      };
      setToReadList((oldToReadList) => [...oldToReadList, newBook]);
      setIsAddingBook(false);
      setBooks([]);
      setSearch("");
      setTotalPages(0);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  //remove book from Airtable
  const removeToRead = async (id) => {
    console.log(id);
    const url = `https://api.airtable.com/v0/${baseName}/${tableBooksName}/${id}`;
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
      const newTodoList = toReadList.filter(function (toread) {
        return id !== toread.id;
      });
      setToReadList(newTodoList);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  return (
    <div className={style.ToReadContainer}>
      {isAddingBook ? (
        <div>
          <SearchBookForm
            fetchBook={fetchBook}
            page={page}
            limit={limit}
            search={search}
            setSearch={setSearch}
            setIsAddingBook={setIsAddingBook}
            setBooks={setBooks}
            setTotalPages={setTotalPages}
          />

          <FetchList
            books={books}
            setBooks={setBooks}
            addToRead={addToRead}
            fetchBook={fetchBook}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      ) : (
        <div>
          <h1 className={style.ToReadTitle}>{tableBooksName}</h1>
          <button
            className={style.AddNewBookButton}
            type="submit"
            title="add new book"
            onClick={() => setIsAddingBook(true)}
          >
            Add new book
          </button>
          {isLoading ? (
            <p className={style.Loading}>Loading ...</p>
          ) : toReadList.length ? (
            <>
              <ToReadList
                toReadList={toReadList}
                onRemoveToRead={removeToRead}
              />
            </>
          ) : (
            <h2 className={style.MoreBooks}>You need more books!</h2>
          )}
        </div>
      )}
    </div>
  );
}

ToReadContainer.propTypes = {
  tableBooksName: PropTypes.string,
  baseName: PropTypes.string,
  apiKey: PropTypes.string,
};
export default ToReadContainer;
