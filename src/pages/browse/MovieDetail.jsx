import YouTube from "react-youtube";
import { API_KEY, fetchApi } from "../API/request";
import styles from "./MovieDetail.module.css";
import { useEffect, useState } from "react";

function MovieDetail(props) {
  // console.log(props.movie.id);
  //fetch Dữ liệu
  const [infoMovie, setInfoMovie] = useState(null);

  useEffect(() => {
    if (!props.movie.id) return;

    fetch(`http://localhost:5000/api/movie/video?film_id=${props.movie.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.key) {
          setInfoMovie(data.key);
        } else {
          console.warn("Không tìm thấy trailer cho phim này.");
          setInfoMovie(null);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy trailer:", error);
        setInfoMovie(null);
      });
  }, [props.movie.id]);

  //Thay đổi định dạng ngày
  const dateMovie = new Date(`${props.movie.release_date}`);

  const month = dateMovie.toLocaleString("en-US", { month: "short" });
  const day = dateMovie.toLocaleString("en-US", { day: "2-digit" });
  const year = dateMovie.getFullYear();

  //Style video youtube
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  //Thay video lỗi bằng hình ảnh
  const replaceVideoErr = () => {
    setInfoMovie(null);
  };
  // console.log(infoMovie);
  return (
    <div className={styles.container}>
      <div className={styles.movieDetail}>
        <h1>
          {props.movie.name ? props.movie.name : props.movie.original_title}
        </h1>
        <div className={styles.subText}>
          Release Date:{" "}
          {day == "Invalid Date"
            ? "Release date has not been determined"
            : `${month} ${day} ${year}`}
          <br />
          Vote: {props.movie.vote_average}/10
        </div>
        <p>{props.movie.overview}</p>
      </div>
      {!infoMovie ? (
        <img
          src={`http://image.tmdb.org/t/p/original${
            props.movie[`backdrop_path`]
          }`}
        /> //Thay thế ảnh khi không có link Youtube
      ) : (
        <YouTube
          onError={replaceVideoErr}
          key={infoMovie}
          videoId={infoMovie}
          opts={opts}
        />
      )}
    </div>
  );
}

export default MovieDetail;
