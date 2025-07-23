import React, { useState } from "react";
import { NavBar } from "./NavBar";
import { MovieList } from "./MovieList";
import { Banner } from "./Banner";

function Browse() {
  const [detailOpen, setDetailOpen] = useState(null);

  const handleDetailOpen = (category) => {
    setDetailOpen(category);
  };

  return (
    <>
      <NavBar />
      <Banner />

      <MovieList
        onOpen={handleDetailOpen}
        mainCategory={detailOpen}
        category="Original"
        title="Phim Original"
        url="/api/movie/trending" // Đổi endpoint đúng với backend
      />
      <MovieList
        onOpen={handleDetailOpen}
        mainCategory={detailOpen}
        category="Trending"
        title="Xu hướng"
        url="/api/movie/trending"
      />
      <MovieList
        onOpen={handleDetailOpen}
        mainCategory={detailOpen}
        category="Rating"
        title="Xếp hạng cao"
        url="/api/movie/top-rate"
      />
      <MovieList
        onOpen={handleDetailOpen}
        mainCategory={detailOpen}
        category="Action"
        title="Hành động"
        url="/api/movie/discover?genre=28&page=1"
      />
      <MovieList
        onOpen={handleDetailOpen}
        mainCategory={detailOpen}
        category="Comedy"
        title="Hài"
        url="/api/movie/discover?genre=35&page=1"
      />
      <MovieList
        onOpen={handleDetailOpen}
        mainCategory={detailOpen}
        category="Horror"
        title="Kinh dị"
        url="/api/movie/discover?genre=27&page=1"
      />
      <MovieList
        onOpen={handleDetailOpen}
        mainCategory={detailOpen}
        category="Romance"
        title="Lãng mạn"
        url="/api/movie/discover?genre=10749&page=1"
      />
      <MovieList
        onOpen={handleDetailOpen}
        mainCategory={detailOpen}
        category="Documentaries"
        title="Tài liệu"
        url="/api/movie/discover?genre=99&page=1"
      />
    </>
  );
}

export default Browse;
