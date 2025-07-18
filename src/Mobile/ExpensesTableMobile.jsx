import React from "react";
import styled from "styled-components";

const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 6px;
  color: #6b7280;
  font-weight: 600;
  font-size: 0.75rem;
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
  font-size: 0.75rem;
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

const formatDate = (dateString) => {
  const d = new Date(dateString);
  if (isNaN(d)) return dateString;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const ExpensesTableMobile = ({ expenses }) => (
  <>
    <TableHeader>
      <HeaderCell>Описание</HeaderCell>
      <HeaderCell>Категория</HeaderCell>
      <HeaderCell>Дата</HeaderCell>
      <HeaderCell>Сумма</HeaderCell>
    </TableHeader>
    {expenses.length === 0 ? (
      <TableRow>
        <RowCell style={{ flex: "1", textAlign: "center" }}>
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
  </>
);

export default ExpensesTableMobile;
