import React from "react";
import styled from "styled-components";

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  color: #000;
  font-weight: 700;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;

  &:focus-visible {
    outline: 2px solid #1fa46c;
    outline-offset: 2px;
  }
`;

const LogoIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: #000;
  flex-shrink: 0;
`;

const Logo = () => (
  <LogoLink href="/" aria-label="Перейти на главную страницу Skypro Wallet" tabIndex={0}>
    <LogoIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 7h16v10H4z" fill="#1FA46C" />
      <path d="M20 7h-4v10h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" fill="#0B6B3B" />
      <circle cx="16" cy="12" r="1.5" fill="#fff" />
    </LogoIcon>
    Skypro.Wallet
  </LogoLink>
);

export default Logo;
