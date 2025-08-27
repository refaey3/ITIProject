import React, { useState } from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  span {
    font-size: 14px;
    color: #000;
  }
`;
export default function NavBar() {
  const navigate=useNavigate();
  return (
    <>
      <Nav>
        <Logo onClick={()=>navigate("/")}>Movie App</Logo>
        <NavItems>
          <span>En</span>
          <Wishlist onClick={() => navigate("/watchlist")}>
            <Heart size={18} />
            <span>watchlist</span>
          </Wishlist>
        </NavItems>
      </Nav>
    </>
  );
}
