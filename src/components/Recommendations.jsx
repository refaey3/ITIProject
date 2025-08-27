import React, { useState, useEffect } from "react";
import Movie from "./Movie";

export default function Recommendations({ movieId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "ab7e358c4c026cabfdffcf29898076f0";

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();

        setMovies(data.results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchRecommendations();
    }
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (movies.length === 0) return <p>No recommendations available.</p>;

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
