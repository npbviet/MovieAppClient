import React, { useRef, useEffect, useState } from "react";
import styles from "./ResultList.module.css";
import MovieItem from "../browse/MovieItem";
import MovieDetail from "../browse/MovieDetail";

const ResultList = ({ movies, hasSearched }) => {
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const divRef = useRef();

  useEffect(() => {
    setMovieList(movies);
    setSelectedMovie(null);
  }, [movies]);

  const toggleMovieInfo = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  const scrollToElement = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={divRef}>
      {hasSearched && (
        <>
          <div className={styles.titleMVList}>Search Result</div>
          {selectedMovie && <MovieDetail movie={selectedMovie} />}
          <div className={styles.containerMVList}>
            {movieList.length > 0 ? (
              <ul className={styles.movieList}>
                {movieList.map((movie, index) => (
                  <div key={index}>
                    <MovieItem
                      onClick={() => {
                        toggleMovieInfo(movie);
                        scrollToElement();
                      }}
                      poster={movie.backdrop_path || movie.poster_path}
                      name={movie.name || movie.original_title}
                    />
                  </div>
                ))}
              </ul>
            ) : (
              // Chỉ hiển thị nếu người dùng đã tìm kiếm nhưng không có kết quả
              <div className={styles.noResults}>
                Không tìm thấy kết quả nào.
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ResultList;
