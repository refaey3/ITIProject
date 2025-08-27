import React, { useContext } from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";

const Nav = styled("nav")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 18px;
  background-color: #ffcc00;
  height: 30px;
  padding: 20px 20px;
  z-index: 1000;
  position: sticky;
  top: 0;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  span {
    font-size: 14px;
    color: #000;
    cursor: pointer;
  }
`;

const Wishlist = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  span {
    font-size: 14px;
    color: #000;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -19px;
  right: -12px;
  background: #ffffff;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;

  border-radius: 5px;
`;

export default function NavBar() {
  const navigate = useNavigate();
  const { favorites } = useContext(FavoriteContext);

  return (
    <>
      <Nav>
        <Logo onClick={() => navigate("/")}>Movie App</Logo>
        <NavItems>
          <span>En</span>
          <Wishlist onClick={() => navigate("/watchlist")}>
            <Heart size={18} />
            {favorites.length > 0 && <Badge>{favorites.length}</Badge>}
            <span>watchlist</span>
          </Wishlist>
        </NavItems>
      </Nav>
    </>
  );
}
