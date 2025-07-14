import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ExpenseForm from "./ExpenseForm";
import FilterControls from "./FilterControls";

// Стили для мобильной версии
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

const Section = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  margin-bottom: 1.25rem;
`;

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

// Форматируем дату в дд.мм.гггг
const formatDate = (dateString) => {
  const d = new Date(dateString);
  if (isNaN(d)) return dateString;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const ExpensesTableMobile = ({ expenses }) => (
  <TableWrapper>
    <TableHeader>
      <HeaderCell>Описание</HeaderCell>
      <HeaderCell>Категория</HeaderCell>
      <HeaderCell>Дата</HeaderCell>
      <HeaderCell>Сумма</HeaderCell>
    </TableHeader>
    {expenses.map(({ id, description, category, date, amount }) => (
      <TableRow key={id}>
        <RowCell title={description}>{description}</RowCell>
        <RowCell title={category}>{category}</RowCell>
        <RowCell>{formatDate(date)}</RowCell>
        <RowCell>{amount.toLocaleString("ru-RU")} ₽</RowCell>
      </TableRow>
    ))}
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
  const scrollToForm = () => {
    const formSection = document.querySelector("#expense-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header currentPath="/" />
      <Container>
        <ContentWrapper>
          <Section>
            <TableTitleRow>
              <TableTitle>Мои расходы</TableTitle>
              <NewExpenseButton onClick={scrollToForm} aria-label="Новый расход">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Новый расход
              </NewExpenseButton>
            </TableTitleRow>

            {/* Фильтры и сортировка */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <FilterControls
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                isCompact
              />
            </div>

            {/* Таблица расходов */}
            <ExpensesTableMobile expenses={expenses} />

            {/* Форма добавления нового расхода */}
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