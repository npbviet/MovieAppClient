import React, { useRef, useState } from "react";
import styles from "./SearchForm.module.css";
const SearchForm = (props) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  //Ham lay gia tri Input
  function handleSearch(event) {
    event.preventDefault();
    if (inputValue.trim() === "") {
      alert("Please enter the movie which you are looking for");
      return;
    }
    props.onSubmit(inputValue);
    setInputValue("");
  }
  //Thiết lập nút enter trùng với nút search
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };
  return (
    <section className={styles.searchForm}>
      <form onSubmit={handleSearch}>
        <div className={styles.headerForm}>
          <div className={styles.containerFlex}>
            <input
              type="text"
              value={inputValue}
              ref={inputRef}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleEnter}
            />
            <div className={styles.iconSearch}>
              <svg
                className="svg-inline--fa fa-search fa-w-16"
                fill="#ccc"
                aria-hidden="true"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.containerButton}>
          <button onClick={props.onReset}>RESET</button>
          <button>SEARCH</button>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
