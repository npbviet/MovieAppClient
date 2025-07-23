import styles from "./MovieItem.module.css";

function MovieItem(props) {
  return (
    <li className={styles.movieItem} onClick={props.onClick}>
      <img
        className={`${styles.imgTransform} ${
          props.title ? styles.imgBackdrop : styles.imgPoster
        }`}
        src={`http://image.tmdb.org/t/p/w500${props.poster}`}
        alt={props.name}
      />
    </li>
  );
}

export default MovieItem;
