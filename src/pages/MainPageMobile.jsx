import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";
import FilterControls from "./FilterControls";

// Стили для мобильной версии
const Container = styled.div`
  padding: 1rem 0;
  background: #f5f5f5;
  min-height: calc(100vh - 3.5rem);
`;

const ContentWrapper = styled.div`
  padding: 0 0.625rem;
`;

const MainTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #000000;
  margin-bottom: 0.9375rem;
`;

const Section = styled.div`
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1.25rem;
`;

const TableControlsWrapper = styled.div`
  margin-bottom: 0.9375rem;
`;

const TableTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: #000000;
  margin-bottom: 0.625rem;
`;

// Компонент мобильной версии главной страницы
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
  return (
    <>
      <Header currentPath="/" />
      <Container>
        <ContentWrapper>
          <MainTitle>Мои расходы</MainTitle>
          <Section>
            <TableControlsWrapper>
              <TableTitle>Таблица расходов</TableTitle>
              <FilterControls
                key={`${filterCategory}-${sortBy}`}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </TableControlsWrapper>
            <ExpenseTable
              expenses={expenses}
              onEdit={onEdit}
              onDelete={onDelete}
              activeExpenseId={activeExpenseId}
            />
          </Section>
          <Section>
            <ExpenseForm editData={editData} onSubmit={onSubmit} onCancel={onCancel} />
          </Section>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default MainPageMobile;