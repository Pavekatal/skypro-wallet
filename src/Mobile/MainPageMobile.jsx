import React, { useState } from "react";
import styled from "styled-components";
import HeaderMobile from "./HeaderMobile";
import ExpensesTableMobile from "./ExpensesTableMobile";
import ExpenseFormMobile from "./ExpenseFormMobile";
import FilterControls from "../pages/FilterControls";

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isForm",
})`
  background: ${(props) => (props.isForm ? "#fff" : "#f5f5f5")};
  min-height: 100vh;
  padding-top: 3.5rem;
  font-family: "Montserrat", sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
`;

const TableContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 1.25rem;
  padding: 20px 20px 24px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 375px;
  margin: 0 auto;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableTitle = styled.h2`
  font-weight: 700;
  font-size: 1.75rem;
  margin: 0;
`;

const NewExpenseButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  font-weight: 600;
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
  white-space: nowrap;

  &:hover,
  &:focus-visible {
    background-color: #f4f5f6;
    outline: none;
  }
`;

const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5.99984 0.166687C2.78567 0.166687 0.166504 2.78585 0.166504 6.00002C0.166504 9.21419 2.78567 11.8334 5.99984 11.8334C9.214 11.8334 11.8332 9.21419 11.8332 6.00002C11.8332 2.78585 9.214 0.166687 5.99984 0.166687ZM8.33317 6.43752H6.43734V8.33335C6.43734 8.57252 6.239 8.77085 5.99984 8.77085C5.76067 8.77085 5.56234 8.57252 5.56234 8.33335V6.43752H3.6665C3.42734 6.43752 3.229 6.23919 3.229 6.00002C3.229 5.76085 3.42734 5.56252 3.6665 5.56252H5.56234V3.66669C5.56234 3.42752 5.76067 3.22919 5.99984 3.22919C6.239 3.22919 6.43734 3.42752 6.43734 3.66669V5.56252H8.33317C8.57234 5.56252 8.77067 5.76085 8.77067 6.00002C8.77067 6.23919 8.57234 6.43752 8.33317 6.43752Z"
      fill="black"
    />
  </svg>
);

const MainPageMobile = ({
  expenses,
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
  const [showNewExpensePage, setShowNewExpensePage] = useState(false);

  const onClickNewExpense = () => setShowNewExpensePage(true);
  const onClickBackToExpenses = () => setShowNewExpensePage(false);

  return (
    <>
      <HeaderMobile
        showNewExpensePage={showNewExpensePage}
        setShowNewExpensePage={setShowNewExpensePage}
      />

      <Container isForm={showNewExpensePage}>
        <ContentWrapper>
          {showNewExpensePage ? (
            <ExpenseFormMobile
              key="form"
              editData={editData}
              onSubmit={onSubmit}
              onCancel={() => {
                onCancel?.();
                onClickBackToExpenses();
              }}
            />
          ) : (
            <section key="list">
              <TableContainer aria-label="Таблица расходов">
                <TitleRow>
                  <TableTitle>Мои расходы</TableTitle>
                  <NewExpenseButton
                    onClick={onClickNewExpense}
                    aria-label="Новый расход"
                    type="button"
                  >
                    <PlusIcon />
                    Новый расход
                  </NewExpenseButton>
                </TitleRow>

                <FilterControls
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  isCompact={false}
                />

                <ExpensesTableMobile
                  expenses={expenses}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </TableContainer>
            </section>
          )}
        </ContentWrapper>
      </Container>
    </>
  );
};

export default MainPageMobile;
