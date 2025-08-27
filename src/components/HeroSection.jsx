import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Movie from "./Movie";

const NowPlayingSection = styled.section`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 15px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.active ? "#ffcc00" : "#fff")};
  color: ${(props) => (props.active ? "#000" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    background-color: #e6b800;
    color: #000;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const apiKey = "ab7e358c4c026cabfdffcf29898076f0";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const endpoint = query
          ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}`
          : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`;

        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, query]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const getPageRange = () => {
    const range = 2;
    let startPage = Math.max(1, currentPage - range);
    let endPage = Math.min(totalPages, currentPage + range);

    if (endPage - startPage + 1 < 5) {
      startPage = Math.max(1, endPage - 4);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <SearchBar onSearch={(q) => { setQuery(q); setCurrentPage(1); }} />
      <NowPlayingSection>
        <SectionTitle>{query ? `Results for "${query}"` : "Now Playing"}</SectionTitle>
        <MovieGrid>
          {movies.length > 0 ? (
            movies.map((movie) => <Movie key={movie.id} movie={movie} />)
          ) : (
            <p>No movies found</p>
          )}
        </MovieGrid>
        <Pagination>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          {getPageRange().map((page) => (
            <PageButton
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageButton>
          ))}
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      </NowPlayingSection>
    </div>
  );
}
