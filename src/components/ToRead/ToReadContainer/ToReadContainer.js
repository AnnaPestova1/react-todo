import React, { useState } from "react";
import ToReadList from "../ToReadList/ToReadList";
import PropTypes from "prop-types";
import InputWithLabel from "../../InputWithLabel";
import FetchList from "./FetchList/FetchList";

/*The component that works with API and adds, deletes and fetches the data from there */

function ToReadContainer({ tableBooksName, baseName, apiKey }) {
  const [toReadList, setToReadList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

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

      // console.log(data);

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
  }, [tableBooksName]);

  const fetchBook = async (search) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(search);
      console.log(data);
      setBooks(data.items);

      //   const toRead = data.records.map((toRead) => {
      //     return {
      //       id: toRead.id,
      //       Name: toRead.fields.Name,
      //       Author: toRead.fields.Author,
      //     };
      //   });

      // setBooks(toRead);

      //   setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    fetchBook(search);
  }, [search]);

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
    <div>
      {isAddingBook ? (
        <div>
          <input
            type="text"
            placeholder="Search Books..."
            onChange={(event) => setSearch(event.target.value)}
          />
          <FetchList books={books} setSelectedBook={setSelectedBook} />
        </div>
      ) : (
        <>
          <h1>{tableBooksName}</h1>
          <button
            type="submit"
            title="add new book"
            onClick={() => setIsAddingBook(true)}
          >
            Add new book
          </button>
          {isLoading ? (
            <p>Loading ...</p>
          ) : toReadList.length ? (
            <>
              <ToReadList
                toReadList={toReadList}
                onRemoveToRead={removeToRead}
              />
            </>
          ) : (
            <h2>You need more books!</h2>
          )}
        </>
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
