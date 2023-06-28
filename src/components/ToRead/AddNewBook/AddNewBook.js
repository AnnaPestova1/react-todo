import React from "react";
import InputWithLabel from "../../InputWithLabel";
import Button from "../../Button/Button";
import { ReactComponent as Add } from "../../../img/add_black_24dp.svg";
import style from "./AddNewBook.module.css";

function AddNewBook() {
  return (
    <div>
      <h2>
        <strong>Enter new book</strong>
      </h2>
      <form
        //    onSubmit={handleAddNewBook}
        className={style.AddNewBook}
      >
        <div className={style.ContainerForNewBook}>
          <div className={style.BookName}>
            <InputWithLabel
              id="bookName"
              placeholder="enter book name"
              //   value={something}
              //   onInputChange={something}
            >
              <strong>Name:</strong>
            </InputWithLabel>
            <div>
              <InputWithLabel
                id="bookAuthor"
                placeholder="enter book author"
                // value={something}
                // onInputChange={something}
              >
                <strong>Author:</strong>
              </InputWithLabel>
            </div>
            <div className={style.buttonAddBook}>
              <Button type="submit" title="add information about new book">
                <Add />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewBook;
