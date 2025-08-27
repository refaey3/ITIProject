import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Recommendations from "../components/Recommendations";
import styled from "styled-components";
import { Heart } from "lucide-react";

const Container = styled.div`
  margin-top: 40px;
  font-family: Arial, sans-serif;
  padding: 0 20px;
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 270px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Body = styled.div`
  flex: 1;
  min-width: 250px;
  line-height: 28px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  span {
    display: block;
    color: #999;
    margin-top: 3px;
    font-size: 14px;
  }
`;

const Overview = styled.p`
  margin: 15px 0;
  font-size: 16px;
  color: #333;
`;

const Tags = styled.div`
  margin: 15px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background: #ffce00;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
`;

const Details = styled.div`
  margin-top: 15px;
  font-size: 14px;
  span {
    margin-right: 20px;
    display: inline-block;
  }
`;

const CompanyLogo = styled.img`
  margin-top: 15px;
  width: 120px;
  object-fit: contain;
`;

const WebsiteBtn = styled.a`
  display: block;
  margin-top: 33px;
  padding: 8px 14px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: #333;
  transition: 0.3s;
  width: 92px;
  &:hover {
    background: #f2f2f2;
  }
`;

const Favorite = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: ${(props) => (props.isFavorite ? "#ffcc00" : "black")};
`;

export default function FilmDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite,setIsFavorite] =useState(false)
  const apiKey = "ab7e358c4c026cabfdffcf29898076f0";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <Container>
      <Main>
        <Img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        <Body>
          <Favorite
            isFavorite={isFavorite}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart color="gold" size={28} />
          </Favorite>
          <Title>
            {movie.title}
            <span>{movie.release_date}</span>
          </Title>

          <p>
            ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count})
          </p>

          <Overview>{movie.overview}</Overview>

          <Tags>
            {movie.genres?.map((genre) => (
              <Tag key={genre.id}>{genre.name}</Tag>
            ))}
          </Tags>

          <Details>
            <span>
              <strong>Duration:</strong> {movie.runtime} Min.
            </span>
            <span>
              <strong>Languages:</strong> {movie.original_language}
            </span>
          </Details>

          {movie.production_companies?.[0]?.logo_path && (
            <CompanyLogo
              src={`https://image.tmdb.org/t/p/w200${movie.production_companies[0].logo_path}`}
              alt={movie.production_companies[0].name}
            />
          )}

          {movie.homepage && (
            <WebsiteBtn href={movie.homepage} target="_blank">
              Website 🌐
            </WebsiteBtn>
          )}
        </Body>
      </Main>

      <h2 style={{ marginTop: "40px" }}>Recommendations</h2>
      <Recommendations movieId={movie.id} />
    </Container>
  );
}
