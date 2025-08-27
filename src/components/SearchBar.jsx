import React, { useState } from "react";
import styled from "styled-components";
import { Search } from "lucide-react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 220px;
  background: #ddd;
  color: black;
  padding: 20px;
  text-align: center;
  margin: 9px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: #000000ff;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  background: white;
  border-radius: 30px;
  padding: 5px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 15px 10px;
  font-size: 16px;
  background: transparent;

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 14px;
  }
`;

const SearchButton = styled.button`
  background: #ffcc00;
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  color: #000;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  margin-left: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  white-space: nowrap;

  &:hover {
    background: #e6b800;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    padding: 12px 20px;
  }
`;

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query); // نبعث الـ query للـ HomePage
    }
  };

  return (
    <Container>
      <Title>Welcome to our movie app</Title>
      <Subtitle>
        Millions of movies, TV shows and people to discover. Explore now.
      </Subtitle>

      <SearchForm onSubmit={handleSearch}>
        <InputContainer>
          <Search size={20} style={{ color: "#666", marginRight: "10px" }} />
          <SearchInput
            type="text"
            placeholder="Search and explore..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputContainer>
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>
    </Container>
  );
}
