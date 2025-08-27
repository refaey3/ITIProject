import React, { useContext } from "react";
import { FavoriteContext } from "../components/context/FavoriteContext";
import Movie from "../components/Movie";

export default function WatchList() {
  const { favorites } = useContext(FavoriteContext);

  if (favorites.length === 0) return <p>No movies in your WatchList</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px" ,marginTop:"50px" }}>
      {favorites.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
