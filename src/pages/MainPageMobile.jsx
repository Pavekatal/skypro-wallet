import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header"; // если не используется, можно удалить
import ExpenseTable from "./ExpenseTable"; // если не используется, можно удалить
import ExpenseForm from "./ExpenseForm";
import FilterControls from "./FilterControls";
import { LogoIcon } from "../components/Icons.jsx";

// Иконка плюса, используется в кнопке "Новый расход"
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
  padding: 1rem 0;
  background: #f5f5f5;
  min-height: calc(100vh - 3.5rem);
  max-width: 375px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  padding: 0 16px 0 16px;
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

const MobileTableWrapper = styled.div`
  width: 343px;
  height: 488px;
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  font-family: "Montserrat", sans-serif;
  margin: 0 auto;
`;

const TableHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const TableTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #000000;
  margin: 0;
`;

const NewExpenseButton = styled.button`
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;
  padding: 0;
  gap: 4px;

  &:hover,
  &:focus-visible {
    color: #3ea08f;
    outline: none;
  }
`;

const FilterControlsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: nowrap;
`;

const MobileTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: clamp(0.55rem, 1vw, 0.75rem);
  color: #999999;
`;

const MobileTableRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
`;

const MobileTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.5rem;
  border-top: 1px solid #eee;
  font-size: clamp(0.55rem, 1vw, 0.7rem);
  color: #000000;
  line-height: 1.2;

  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const MobileTableCell = styled.div`
  flex-basis: ${(props) => props.width || "auto"};
  flex-shrink: 1;
  text-align: ${(props) => props.align || "left"};
  padding: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const Section = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1.25rem;
`;

// --- Компонент MainPageMobile ---

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
  // Состояние для открытия меню в шапке
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [selectedHeaderMenu, setSelectedHeaderMenu] = useState("my_expenses");

  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setHeaderMenuOpen(false));

  const onSelectMenu = (id) => {
    setSelectedHeaderMenu(id);
    setHeaderMenuOpen(false);
    // Здесь можно добавить логику переключения между меню
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
          {/* Таблица расходов */}
          <MobileTableWrapper aria-label="Таблица расходов">
            <TableHeaderTop>
              <TableTitle>Мои расходы</TableTitle>
              <NewExpenseButton
                onClick={() => alert("Новый расход")}
                aria-label="Добавить новый расход"
                type="button"
              >
                <PlusIcon /> Новый расход
              </NewExpenseButton>
            </TableHeaderTop>

            {/* Фильтры */}
            <FilterControlsWrapper>
              <FilterControls
                key={`${filterCategory}-${sortBy}`}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </FilterControlsWrapper>

            {/* Заголовок таблицы */}
            <MobileTableHeader>
              <MobileTableCell width="40%">Описание</MobileTableCell>
              <MobileTableCell width="20%">Категория</MobileTableCell>
              <MobileTableCell width="20%" align="center">
                Дата
              </MobileTableCell>
              <MobileTableCell width="20%" align="right">
                Сумма
              </MobileTableCell>
            </MobileTableHeader>

            {/* Строки таблицы */}
            {expenses.length === 0 ? (
              <MobileTableRow>Нет данных</MobileTableRow>
            ) : (
              <MobileTableRowsContainer>
                {expenses.map((expense) => (
                  <MobileTableRow
                    key={expense.id}
                    active={expense.id === activeExpenseId}
                    aria-selected={expense.id === activeExpenseId}
                    tabIndex={0}
                  >
                    <MobileTableCell width="40%" title={expense.description}>
                      {expense.description}
                    </MobileTableCell>
                    <MobileTableCell width="20%" title={expense.categoryLabel}>
                      {expense.categoryLabel}
                    </MobileTableCell>
                    <MobileTableCell
                      width="20%"
                      align="center"
                      title={expense.formattedDate}
                    >
                      {expense.formattedDate}
                    </MobileTableCell>
                    <MobileTableCell
                      width="20%"
                      align="right"
                      title={`${expense.amount.toLocaleString("ru-RU")} ₽`}
                    >
                      {`${expense.amount.toLocaleString("ru-RU")} ₽`}
                    </MobileTableCell>
                  </MobileTableRow>
                ))}
              </MobileTableRowsContainer>
            )}
          </MobileTableWrapper>

          {/* Форма добавления/редактирования */}
          <Section>
            <ExpenseForm editData={editData} onSubmit={onSubmit} onCancel={onCancel} />
          </Section>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default MainPageMobile;
