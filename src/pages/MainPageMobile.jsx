import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header"; // если не используется, можно удалить
import ExpenseForm from "./ExpenseForm";
import FilterControls from "./FilterControls";
import { LogoIcon } from "../components/Icons.jsx";

// Иконка плюса для кнопки "Новый расход"
const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: 6 }}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5.99984 0.166687C2.78567 0.166687 0.166504 2.78585 0.166504 6.00002C0.166504 9.21419 2.78567 11.8334 5.99984 11.8334C9.214 11.8334 11.8332 9.21419 11.8332 6.00002C11.8332 2.78585 9.214 0.166687 5.99984 0.166687ZM8.33317 6.43752H6.43734V8.33335C6.43734 8.57252 6.239 8.77085 5.99984 8.77085C5.76067 8.77085 5.56234 8.57252 5.56234 8.33335V6.43752H3.6665C3.42734 6.43752 3.229 6.23919 3.229 6.00002C3.229 5.76085 3.42734 5.56252 3.6665 5.56252H5.56234V3.66669C5.56234 3.42752 5.76067 3.22919 5.99984 3.22919C6.239 3.22919 6.43734 3.42752 6.43734 3.66669V5.56252H8.33317C8.57234 5.56252 8.77067 5.76085 8.77067 6.00002C8.77067 6.23919 8.57234 6.43752 8.33317 6.43752Z"
      fill="black"
    />
  </svg>
);

// --- Стили ---

const Container = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
  padding-top: 3.5rem;
  font-family: "Montserrat", sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
`;

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

const Logo = styled.img`
  width: 24px;
  height: 24px;
  user-select: none;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  color: #3ea08f;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;

  &:focus-visible {
    outline: 2px solid #3ea08f;
    outline-offset: 2px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 0;
  background: #e8f8f5;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  z-index: 100;
  padding: 0.5rem 0;
  user-select: none;
`;

const DropdownItem = styled.button`
  width: 100%;
  background: ${(props) => (props.active ? "#b6e4dd" : "transparent")};
  border: none;
  padding: 0.5rem 1rem;
  text-align: left;
  font-weight: ${(props) => (props.active ? "700" : "400")};
  color: #000000;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: #b6e4dd;
    outline: none;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  color: #000000;
  cursor: pointer;
  user-select: none;
  padding: 0;

  &:hover,
  &:focus-visible {
    color: #3ea08f;
    outline: none;
  }
`;

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}

const TableTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const TableTitle = styled.h1`
  font-weight: 700;
  font-size: 1.75rem;
  margin: 0;
  color: #000;
`;

const NewExpenseButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  font-weight: 600;
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    margin-right: 6px;
    width: 16px;
    height: 16px;
    stroke: #333;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &:hover {
    background-color: #f4f5f6;
  }
`;

// --- Мобильная таблица расходов ---

const TableWrapper = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 1.25rem;
  padding: 16px 20px 20px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 10px;
  color: #000;
  overflow-y: auto;
`;

const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 4px;
  color: #6b7280;
  font-weight: 600;
`;

const HeaderCell = styled.div`
  &:nth-child(1) {
    flex: 3;
    text-align: left;
  }
  &:nth-child(2) {
    flex: 2;
    text-align: left;
  }
  &:nth-child(3) {
    flex: 2;
    text-align: center;
  }
  &:nth-child(4) {
    flex: 2;
    text-align: right;
  }
`;

const TableRow = styled.div`
  display: flex;
  height: 12px;
  gap: 16px;
  align-items: center;
  font-weight: 400;
  color: #000;
`;

const RowCell = styled.div`
  &:nth-child(1) {
    flex: 3;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    flex: 2;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(3) {
    flex: 2;
    text-align: center;
  }
  &:nth-child(4) {
    flex: 2;
    text-align: right;
  }
`;

// Формат даты дд.мм.гггг
const formatDate = (dateString) => {
  const d = new Date(dateString);
  if (isNaN(d)) return dateString;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const ExpensesTableMobile = ({ expenses }) => (
  <TableWrapper aria-label="Таблица расходов">
    <TableHeader>
      <HeaderCell>Описание</HeaderCell>
      <HeaderCell>Категория</HeaderCell>
      <HeaderCell>Дата</HeaderCell>
      <HeaderCell>Сумма</HeaderCell>
    </TableHeader>
    {expenses.length === 0 ? (
      <TableRow>
        <RowCell colSpan={4} style={{ textAlign: "center" }}>
          Нет данных
        </RowCell>
      </TableRow>
    ) : (
      expenses.map(({ id, description, categoryLabel, date, amount }) => (
        <TableRow key={id}>
          <RowCell title={description}>{description}</RowCell>
          <RowCell title={categoryLabel}>{categoryLabel}</RowCell>
          <RowCell>{formatDate(date)}</RowCell>
          <RowCell>{amount.toLocaleString("ru-RU")} ₽</RowCell>
        </TableRow>
      ))
    )}
  </TableWrapper>
);

const MainPageMobile = ({
  expenses,
  activeExpenseId,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  editData,
  onEdit,
  onDelete,
  onSubmit,
  onCancel,
}) => {
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [selectedHeaderMenu, setSelectedHeaderMenu] = useState("my_expenses");

  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setHeaderMenuOpen(false));

  const onSelectMenu = (id) => {
    setSelectedHeaderMenu(id);
    setHeaderMenuOpen(false);
    // Здесь можно добавить логику переключения между меню
  };

  const scrollToForm = () => {
    const formSection = document.querySelector("#expense-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Шапка */}
      <CustomHeaderContainer>
        <Logo src="/logo.svg" alt="Логотип Skypro Wallet" />

        <HeaderButtons ref={menuRef}>
          <MenuButton
            aria-haspopup="true"
            aria-expanded={headerMenuOpen}
            onClick={() => setHeaderMenuOpen((v) => !v)}
            aria-label="Открыть меню Мои расходы"
            type="button"
          >
            Мои расходы <span aria-hidden="true">▼</span>
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
                  active={selectedHeaderMenu === id}
                  onClick={() => onSelectMenu(id)}
                  role="menuitem"
                  type="button"
                >
                  {label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}

          <LogoutButton onClick={() => alert("Выйти")} type="button">
            Выйти
          </LogoutButton>
        </HeaderButtons>
      </CustomHeaderContainer>

      {/* Основной контейнер */}
      <Container>
        <ContentWrapper>
          <Section>
            <TableTitleRow>
              <TableTitle>Мои расходы</TableTitle>
              <NewExpenseButton onClick={scrollToForm} aria-label="Новый расход">
                <PlusIcon />
                Новый расход
              </NewExpenseButton>
            </TableTitleRow>

            <FilterControls
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              isCompact
            />

            <ExpensesTableMobile expenses={expenses} />

            <Section id="expense-form-section">
              <ExpenseForm editData={editData} onSubmit={onSubmit} onCancel={onCancel} />
            </Section>
          </Section>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default MainPageMobile;
