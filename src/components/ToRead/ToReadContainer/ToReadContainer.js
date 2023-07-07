import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../../Loader/Loader";
import Button from "../../Button/Button.tsx";
import ToReadList from "../ToReadList/ToReadList";
import FetchList from "../FetchList/FetchList";
import SearchBookForm from "../SearchBookForm/SearchBookForm";
import SortToRead from "../SortToRead/SortToRead";
import AddNewBook from "../AddNewBook/AddNewBook";
import style from "./ToReadContainer.module.css";

//The component that works with API and get, add and delete books from Airtable and get books from Google
function ToReadContainer({ tableBooksName, baseName, apiKey }) {
  //books from Airtable
  const [toReadList, setToReadList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  //books from Google Books
  const [books, setBooks] = useState([]);
  //showing page from Google
  const [page, setPage] = useState(1);
  const [isManuallyAddingBook, setIsManuallyAddingBook] = useState(false);
  //limit books per page from Google
  const limit = 10;

  //changing background for ToRead page
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/toread") {
      document.body.style.backgroundImage = "url('./IMG_4911.jpeg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  }, [location.pathname]);

  const onSortByName = () => {
    function sortData(a, b) {
      if (a.Name > b.Name) {
        return 1;
      }
      if (a.Name < b.Name) {
        return -1;
      }
      return 0;
    }
    setToReadList((oldToReadList) => [...oldToReadList].sort(sortData));
  };

  const onSortByNameDes = () => {
    function sortData(a, b) {
      if (a.Name < b.Name) {
        return 1;
      }
      if (a.Name > b.Name) {
        return -1;
      }
      return 0;
    }
    setToReadList((oldTodoList) => [...oldTodoList].sort(sortData));
  };
  const onSortByAuthor = () => {
    function sortData(a, b) {
      if (a.Author > b.Author) {
        return 1;
      }
      if (a.Author < b.Author) {
        return -1;
      }
      return 0;
    }
    setToReadList((oldToReadList) => [...oldToReadList].sort(sortData));
  };

  const onSortByAuthorDes = () => {
    function sortData(a, b) {
      if (a.Author < b.Author) {
        return 1;
      }
      if (a.Author > b.Author) {
        return -1;
      }
      return 0;
    }
    setToReadList((oldTodoList) => [...oldTodoList].sort(sortData));
  };
  const sortList = (sortDirection) => {
    switch (sortDirection) {
      case "NameAsc":
        onSortByName();
        break;
      case "NameDesc":
        onSortByNameDes();
        break;
      case "AuthorAsc":
        onSortByAuthor();
        break;
      case "AuthorDesc":
        onSortByAuthorDes();
        break;
      default:
        onSortByName();
    }
    setSortDirection(sortDirection);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

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
      sortList(sortDirection);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData(tableBooksName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableBooksName]);

  // fetch books from Google Books
  const fetchBook = async (search, page, limit, loadMore = false) => {
    const startIndex = (page - 1) * limit;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=${limit}`;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.items) {
        if (loadMore) {
          setBooks([...books, ...data.items]);
        } else {
          setBooks(data.items);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // workind with pagination
  useEffect(() => {
    if (search !== "") {
      fetchBook(search, page, limit, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddingBook, page]);

  //add book from Google Books to Airtable
  const addToRead = async (book) => {
    const postBook = {
      fields: {
        Name: book.volumeInfo.title,
        Author: book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : " ",
      },
    };
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
      sortList(sortDirection);
      setIsAddingBook(false);
      setBooks([]);
      setSearch("");
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  //add manually entered book to Airtable
  const addToReadManually = async (book) => {
    const postBook = {
      fields: {
        Name: book.bookName,
        Author: book.bookAuthor,
      },
    };
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
      sortList(sortDirection);
      setIsAddingBook(false);
      setBooks([]);
      setSearch("");
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  //remove book from Airtable
  const removeToRead = async (id) => {
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
      {isManuallyAddingBook ? (
        <AddNewBook
          onAddNewBook={addToReadManually}
          setIsManuallyAddingBook={setIsManuallyAddingBook}
        />
      ) : isAddingBook && !isManuallyAddingBook ? (
        <div>
          <SearchBookForm
            fetchBook={fetchBook}
            page={page}
            limit={limit}
            search={search}
            setSearch={setSearch}
            setIsAddingBook={setIsAddingBook}
            setBooks={setBooks}
            setIsManuallyAddingBook={setIsManuallyAddingBook}
          />
          {books.length > 0 && (
            <FetchList
              books={books}
              addToRead={addToRead}
              onLoadMore={onLoadMore}
            />
          )}
          {books.length === 0 && (
            <div>
              <h1>Search for the books!</h1>
              <p>
                If you can't find the book in the database, use the <b>+</b>{" "}
                button above to add it manually.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 className={style.ToReadTitle}>{tableBooksName}</h1>
          <span className={style.ToReadLosrAndAddButton}>
            <Button
              type="button"
              title="add new book"
              onClick={() => setIsAddingBook(true)}
            >
              Add new book
            </Button>
          </span>
          {isLoading ? (
            <p className={style.Loading}>
              <Loader />
            </p>
          ) : toReadList.length ? (
            <>
              <SortToRead sortList={sortList} sortDirection={sortDirection} />
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
