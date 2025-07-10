import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogoIcon } from '../components/Icons.jsx';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  height: 64px;
  background-color: rgb(255, 255, 255);
  padding: 0 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  margin-left: 120px;
  svg {
    width: 144px;
    height: 19px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const NavButton = styled(Link)`
  text-decoration: ${props => props.$active ? 'underline' : 'none'};
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-weight: ${props => (props.$active || props.hover) ? '600' : '400'};
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #1FA46C;
    font-weight: 600;
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  margin-left: 20px;
  background: none;
  border: none;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #1FA46C;
  }
`;

const Header = ({ currentPath }) => {
  return (
    <HeaderWrapper>
      <Logo>
        <LogoIcon/>
      </Logo>
      <Nav>
        <NavButton to="/" $active={currentPath === '/'}>Мои расходы</NavButton>
        <NavButton to="/spending-analysis" $active={currentPath === '/spending-analysis'}>Анализ расходов</NavButton>
      </Nav>
      <LogoutButton onClick={() => window.location.href = '/sign-in'}>Выйти</LogoutButton>
    </HeaderWrapper>
  );
};

export default Header;