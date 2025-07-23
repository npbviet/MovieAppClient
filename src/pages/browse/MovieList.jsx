import { useEffect, useRef, useState } from "react";
import styles from "./MovieList.module.css";
import MovieItem from "./MovieItem";
import MovieDetail from "./MovieDetail";

export function MovieList(props) {
  //Lấy thông tin, fetch API movie
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Gọi API từ backend để lấy danh sách phim
    fetch(`http://localhost:5000${props.url}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          setMovies([]); // Nếu API không có kết quả, giữ danh sách rỗng
        }
      })
      .catch((error) => console.error("Lỗi khi lấy danh sách phim:", error));
  }, [props.url]);

  //Ẩn/Hiện thông tin movie
  const [selectedMovie, setSelectedMovie] = useState();
  const toggleMovieInfo = (movie) => {
    if (
      selectedMovie &&
      selectedMovie.id === movie.id &&
      props.category === props.mainCategory
    ) {
      setSelectedMovie(null);
      props.onOpen("");
    } else {
      setSelectedMovie(movie);
      props.onOpen(props.category);
    }
  };
  //Scroll đến view hiện tại
  const divRef = useRef();
  const scrollToElement = () => {
    const { current } = divRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedMovie && props.category === props.mainCategory) {
      scrollToElement();
    }
  }, [props.category, props.mainCategory, selectedMovie]);

  return (
    <section ref={divRef}>
      {props.title && <div className={styles.titleMVList}>{props.title}</div>}
      <div className={styles.containerMVList}>
        <ul className={styles.movieList}>
          {movies.map((movie, index) => {
            return (
              <div key={index}>
                <MovieItem
                  onClick={() => {
                    toggleMovieInfo(movie);
                    // scrollToElement();
                  }}
                  poster={props.title ? movie.backdrop_path : movie.poster_path}
                  name={movie.name ? movie.name : movie.original_title}
                  title={props.title}
                />
              </div>
            );
          })}
        </ul>
      </div>
      {selectedMovie && props.category === props.mainCategory ? (
        <MovieDetail movie={selectedMovie} />
      ) : (
        ""
      )}
    </section>
  );
}
