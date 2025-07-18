import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const CustomHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 3.5rem;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
  user-select: none;
  max-width: 375px;
  margin: 0 auto;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const MenuButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background: none;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1.5rem;

  color: ${(props) => (props.active ? "#1FA46C" : "#000")};
  background-color: ${(props) => (props.active ? "#DBFFE9" : "transparent")};

  &:focus-visible {
    outline: 2px solid #1fa46c;
    outline-offset: 2px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 3.8rem;
  right: 0;
  width: 160px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgb(0 0 0 / 0.1);
  padding: 0.5rem 0;
  z-index: 1000;
  user-select: none;
`;

const DropdownItem = styled.button`
  width: 100%;
  background: #f4f5f6;
  border: none;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  border-radius: 8px;
  margin: 0.25rem 0;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus-visible {
    background-color: #d9d9d9;
    outline: none;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
  user-select: none;

  &:hover,
  &:focus-visible {
    color: #1fa46c;
    outline: none;
  }
`;

const ArrowDown = styled.span`
  font-size: 0.75rem;
  user-select: none;
`;

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const HeaderMobile = ({ showNewExpensePage, setShowNewExpensePage }) => {
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useOutsideClick(menuRef, () => setHeaderMenuOpen(false));

  const onSelectMenu = (id) => {
    setHeaderMenuOpen(false);

    if (id === "my_expenses") {
      setShowNewExpensePage(false);
      navigate("/");
    } else if (id === "new_expense") {
      setShowNewExpensePage(true);
    } else if (id === "analysis") {
      navigate("/spending-analysis");
    }
  };

  const onLogout = () => {
    alert("Выйти");
  };

  return (
    <CustomHeaderContainer>
      <Logo />

      <HeaderButtons ref={menuRef}>
        {!showNewExpensePage ? (
          <>
            <MenuButton
              aria-haspopup="true"
              aria-expanded={headerMenuOpen}
              onClick={() => setHeaderMenuOpen((v) => !v)}
              aria-label="Открыть меню Мои расходы"
              type="button"
              active={!showNewExpensePage}
            >
              Мои расходы <ArrowDown aria-hidden="true">▼</ArrowDown>
            </MenuButton>

            {headerMenuOpen && (
              <DropdownMenu role="menu" aria-label="Меню Мои расходы">
                {[
                  { id: "my_expenses", label: "Мои расходы" },
                  { id: "new_expense", label: "Новый расход" },
                  { id: "analysis", label: "Анализ расходов" },
                ].map(({ id, label }) => (
                  <DropdownItem
                    key={id}
                    onClick={() => onSelectMenu(id)}
                    role="menuitem"
                    type="button"
                    autoFocus={false}
                  >
                    {label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}

            <LogoutButton onClick={onLogout} type="button" aria-label="Выйти из системы">
              Выйти
            </LogoutButton>
          </>
        ) : (
          <>
            <MenuButton
              aria-haspopup="false"
              aria-expanded="false"
              type="button"
              active={true}
              aria-label="Новый расход"
              tabIndex={0}
            >
              Новый расход
            </MenuButton>

            <LogoutButton onClick={onLogout} type="button" aria-label="Выйти из системы">
              Выйти
            </LogoutButton>
          </>
        )}
      </HeaderButtons>
    </CustomHeaderContainer>
  );
};

export default HeaderMobile;
