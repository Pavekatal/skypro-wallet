import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  margin-left: 20px;
`;

const NavButton = styled(Link)`
  text-decoration: ${props => props.active ? 'underline' : 'none'};
  color: ${props => props.active || props.hover ? '#00C853' : '#000'};
  font-family: 'Montserrat', sans-serif;
  font-weight: ${props => props.active || props.hover ? '600' : '400'};
  cursor: pointer;
  &:hover {
    color: #00C853;
    font-weight: 600;
  }
`;

const LogoutButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: #000;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: #00C853;
  }
`;

const Header = ({ currentPath }) => {
  return (
    <HeaderWrapper>
      <Logo>SkypoWallet</Logo>
      <Nav>
        <NavButton to="/" active={currentPath === '/'}>Мои расходы</NavButton>
        <NavButton to="/spending-analysis" active={currentPath === '/spending-analysis'}>Анализ расходов</NavButton>
      </Nav>
      <LogoutButton onClick={() => window.location.href = '/sign-in'}>Выйти</LogoutButton>
    </HeaderWrapper>
  );
};

export default Header;