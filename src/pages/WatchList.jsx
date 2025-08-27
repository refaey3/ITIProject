import React, { useContext } from "react";
import { FavoriteContext } from "../components/context/FavoriteContext";
import Movie from "../components/Movie";
import { useNavigate } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";

export default function WatchList() {
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <FaHeartBroken
          style={{ fontSize: "200px", color: "#ccc", marginBottom: "20px" }}
        />

        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          No Movies in watch list
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#FFD84D",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "30px", padding: "0 20px" }}>
      <h2 style={{ marginBottom: "20px" }}>
        Watch list <span style={{ color: "#ffcc00" }}>({favorites.length})</span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {favorites.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
