import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";

export function Banner() {
  //Lấy thông tin banner
  const [banner, setBanner] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/movie/trending") // Gọi API từ backend
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setBanner(data.results[randomIndex]);
        }
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu banner:", error));
  }, []);

  // Kiểm tra nếu banner chưa có dữ liệu
  if (!banner) {
    return <div className={styles.banner}>Loading...</div>;
  }

  const bannerUrl = `http://image.tmdb.org/t/p/original${
    banner[`backdrop_path`]
  }`;
  //Thiết lập style ảnh nền
  const backGroundStyle = {
    backgroundImage: banner
      ? `linear-gradient(0deg,rgba(44, 7, 5, 0.6) 0%,rgba(44, 7, 5, 0) 100%), url(${bannerUrl})`
      : //linear-gradient(to top rgba(0,0,0,0.8), rgba(255,255,255,0))
        "none",
    backgroundSize: "cover",
    backgroundPosition: "top",
    width: "95.8%",
    height: "30rem",
  };
  return (
    <div className={styles.banner} style={backGroundStyle}>
      {banner && (
        <div className={styles.container}>
          <h1>{banner.name || banner.original_title}</h1>
          <div className={styles.control}>
            <button>Play</button>
            <button>My list</button>
          </div>
          <p>{banner.overview}</p>
        </div>
      )}
      {/* {!banner && (
        <div className={styles.reload}>
          You click too fast. Please F5 to reload
        </div>
      )} */}
    </div>
  );
}
