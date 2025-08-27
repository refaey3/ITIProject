import React, { useContext } from "react";
import { FavoriteContext } from "./context/FavoriteContext";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const MovieCard = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 8px;

  width: 150px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 120px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 225px;
  object-fit: cover;
`;

const RatingBadge = styled.div`
  position: absolute;
  left: 9px;
  background-color: rgb(0 0 0);
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  bottom: 56px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 6px;
  }
`;

const Info = styled.div`
  text-align: center;
  padding: 10px 0;
`;

const Title = styled.h3`
  font-size: 14px;
  margin: 5px 0;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Details = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

const FavoriteIcon = styled(Heart)`
  position: absolute;
  bottom: 40px;
  right: 10px;

  color: ${(props) => (props.isFavorite ? "#ffcc00" : "black")};
  size: 16px;
`;

export default function Movie({ movie }) {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const isFavorite = favorites.some((m) => m.id === movie.id);
  const navigate = useNavigate();
  return (
    <MovieCard>
      <Poster
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={() => navigate(`/FilmDetails/${movie.id}`)}
      />
      <RatingBadge>
        {Math.round(movie.vote_average * 10)} <span>%</span>
      </RatingBadge>
      <FavoriteIcon
        isFavorite={isFavorite}
        onClick={() => toggleFavorite(movie)}
      />
      <Info>
        <Title>{movie.title}</Title>
        <Details>{movie.release_date}</Details>
      </Info>
    </MovieCard>
  );
}
