import React, { useEffect, useState } from "react";
import { NavBar } from "../browse/NavBar";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import styles from "./Search.module.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState(""); // Thể loại (fetch từ backend)
  const [mediaType, setMediaType] = useState("all"); // Loại phim
  const [language, setLanguage] = useState(""); // Ngôn ngữ: "en", "ja", "ko"
  const [year, setYear] = useState(""); // Năm phát hành
  const [genres, setGenres] = useState([]); // Danh sách thể loại từ backend
  const [hasSearched, setHasSearched] = useState(false); // Quản lý trạng thái resultList

  // Fetch danh sách thể loại từ backend
  useEffect(() => {
    fetch("http://localhost:5000/api/genre/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres || []);
      })
      .catch((error) =>
        console.error("Lỗi khi lấy danh sách thể loại:", error)
      );
  }, []);

  useEffect(() => {
    if (!searchQuery) return;

    // Gọi API tìm kiếm từ backend với các tùy chọn
    fetch("http://localhost:5000/api/movie/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `8qlOkxz4wq`,
      },
      body: JSON.stringify({
        keyword: searchQuery,
        genre,
        mediaType,
        language,
        year,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.warn("Không có phim nào phù hợp với bộ lọc.");
          setMovies([]); // ✅ Hiển thị danh sách trống thay vì lỗi
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Phản hồi từ API:", data);
          setMovies(data.results || []);
        }
      })
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, [searchQuery, genre, mediaType, language, year]);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setHasSearched(true); // Đánh dấu đã tìm kiếm
  };
  const handleResetSearch = () => {
    setSearchQuery(""); // Xóa từ khóa tìm kiếm
    setMovies([]); // Xóa toàn bộ kết quả tìm kiếm trước đó
    setGenre(""); // Reset thể loại
    setMediaType("all"); // Reset loại nội dung về mặc định
    setLanguage(""); // Reset ngôn ngữ
    setYear(""); // Reset năm phát hành
    setHasSearched(false); // Reset trạng thái tìm kiếm
  };

  return (
    <div>
      <NavBar />
      <SearchForm onSubmit={handleSearchSubmit} onReset={handleResetSearch} />

      <div className={styles.searchOptions}>
        <label>Thể loại:</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <label>Loại nội dung:</label>
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
          <option value="person">Persons</option>
        </select>

        <label>Ngôn ngữ:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All</option>
          <option value="en">English</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
        </select>

        <label>Năm phát hành:</label>
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <ResultList movies={movies} hasSearched={hasSearched} />
    </div>
  );
};

export default Search;
