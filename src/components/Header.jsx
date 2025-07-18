import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LogoIcon } from "../components/Icons.jsx";
import { AuthContext } from "../context/AuthContext.js";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  height: 3.5rem;
  background-color: #ffffff;
  padding: 0 1rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    height: 4rem;
    padding: 0 1.25rem;
  }
`;

// Экспортируемый компонент Logo для использования в других файлах, например, AuthForm.jsx
export const Logo = styled.div`
  margin-left: 1rem;
  svg {
    width: 9rem;
    height: 1.1875rem;
  }

  @media (min-width: 768px) {
    margin-left: 7.5rem;
    svg {
      width: 9rem;
      height: 1.1875rem;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    gap: 3.125rem;
  }
`;

const NavButton = styled(Link)`
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1fa46c;
    font-weight: 600;
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const MenuButton = styled.button`
  padding: 0.375rem 0.625rem;
  border: none;
  border-radius: 0.25rem;
  background: #ffffff;
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f4f5f6;
  }

  .selected {
    color: #1fa46c;
    text-decoration: underline;
  }

  svg.arrow {
    margin-left: 0.375rem;
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-width: 9.375rem;
  max-height: 15rem;
  border: 0.03125rem solid #999999;
  border-radius: 0.375rem;
  padding: 0.75rem;
  gap: 0.625rem;
  background: #ffffff;
  box-shadow: 0 1.25rem 4.1875rem -0.75rem rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ModalItem = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem;
  border: none;
  background: ${({ $active }) => ($active ? "#DBFFE9" : "#F4F5F6")};
  color: ${({ $active }) => ($active ? "#1FA46C" : "#333")};
  font-family: "Montserrat", sans-serif;
  font-size: 0.75rem;
  text-align: left;
  cursor: pointer;
  border-radius: 1.875rem;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: #f4f5f6;
  }
`;

const ModalButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem;
  border: none;
  background: #F4F5F6;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 0.75rem;
  text-align: left;
  cursor: pointer;
  border-radius: 1.875rem;
  transition: background 0.3s ease;

  &:hover {
    background: #f4f5f6;
  }
`;

const LogoutButton = styled.button`
  margin-left: 1rem;
  background: none;
  border: none;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1fa46c;
  }

  @media (min-width: 768px) {
    margin-left: 1.25rem;
    font-size: 1rem;
  }
`;

const ArrowIcon = () => (
  <svg className="arrow" width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 5.5L0.468911 0.25L6.53109 0.25L3.5 5.5Z" fill="#1FA46C" />
  </svg>
);

// Компонент шапки
const Header = ({ currentPath }) => {
  const { logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Обработка прокрутки к форме "Новый расход"
  const scrollToForm = () => {
    const formSection = document.querySelector("#expense-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: "Мои расходы", path: "/" },
    { label: "Новый расход", action: scrollToForm },
    { label: "Анализ расходов", path: "/spending-analysis" },
  ];

  return (
    <HeaderWrapper>
      <Logo>
        <LogoIcon />
      </Logo>
      <Nav>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={currentPath !== "" ? "selected" : ""}>
            {currentPath === "/" ? "Мои расходы" : currentPath === "/spending-analysis" ? "Анализ расходов" : "Меню"}
            <ArrowIcon />
          </span>
        </MenuButton>
        {isMenuOpen && (
          <Modal>
            {menuItems.map((item) =>
              item.path ? (
                <ModalItem
                  key={item.label}
                  to={item.path}
                  $active={currentPath === item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </ModalItem>
              ) : (
                <ModalButton key={item.label} onClick={item.action}>
                  {item.label}
                </ModalButton>
              )
            )}
          </Modal>
        )}
        <NavButton to="/" $active={currentPath === "/"}>
          Мои расходы
        </NavButton>
        <NavButton to="/spending-analysis" $active={currentPath === "/spending-analysis"}>
          Анализ расходов
        </NavButton>
      </Nav>
      <LogoutButton onClick={logout}>Выйти</LogoutButton>
    </HeaderWrapper>
  );
};

export default Header;