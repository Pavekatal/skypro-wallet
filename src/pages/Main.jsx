import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Header from "../components/Header";
import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";
import FilterControls from "./FilterControls";
import { getTransactions, addOrUpdateTransaction, deleteTransaction } from "../services/transactions";
import { AuthContext } from "../context/AuthContext";
import { format, parse } from "date-fns";
import { categories } from "../constants/categories";
import MainPageMobile from "../Mobile/MainPageMobile";

// Стили для десктопной версии
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.25rem 0;
  background: #f5f5f5;
  min-height: calc(100vh - 4rem);
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  gap: 1.25rem;
`;

const MainTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #000000;
  padding: 0.3125rem 0.625rem;
  border-radius: 0.5rem;
  line-height: 150%;
  margin-bottom: 1.25rem;
`;

const TableAndFormWrapper = styled.div`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TableSection = styled.div`
  flex: 2;
  background: #ffffff;
  border-radius: 1.875rem;
  padding: 2rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  min-width: 49.3125rem;
  max-width: 49.3125rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.375rem;
    border-radius: 1.875rem;
  }
  &::-webkit-scrollbar-track {
    background: #d9d9d9;
  }
  &::-webkit-scrollbar-thumb {
    background: #bbbbbb;
    border-radius: 1.875rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b0b0b0;
  }

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    padding: 1rem;
  }
`;

const FormSection = styled.div`
  flex: 1;
  background: #fff;
  padding: 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  min-width: 18.75rem;
  max-width: 30%;

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    padding: 1rem;
  }
`;

const TableControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.625rem;
    align-items: flex-start;
  }
`;

const TableTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

// Утилитная функция для форматирования данных расходов
const formatExpense = (item) => ({
  id: item._id,
  amount: item.sum,
  description: item.description,
  date: new Date(item.date),
  formattedDate: format(new Date(item.date), "dd.MM.yyyy"),
  categoryLabel: categories.find((cat) => cat.value === item.category)?.label || item.category,
  category: item.category,
});

// Компонент главной страницы
const MainPage = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [activeExpenseId, setActiveExpenseId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [editData, setEditData] = useState(null);

  // Загрузка данных о расходах
  const fetchData = async () => {
    if (!user?.token) {
      toast.error("Токен отсутствует, войдите в систему");
      return;
    }
    try {
      const data = await getTransactions({ sortBy, filterBy: filterCategory }, user.token);
      setExpenses(data.map(formatExpense));
    } catch (error) {
      const message = error.message || "Ошибка при загрузке транзакций";
      toast.error(error.message.includes("401") ? "Войдите в систему" : message);
      setExpenses([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterCategory, sortBy, user?.token]);

  // Обработка редактирования расхода
  const handleEdit = (expense) => {
    setActiveExpenseId(expense.id);
    setEditData({
      id: expense.id,
      amount: expense.amount,
      description: expense.description,
      date: format(new Date(expense.date), "yyyy-MM-dd"),
      categoryLabel: expense.categoryLabel,
      category: expense.category,
    });
  };

  // Обработка удаления расхода
  const handleDelete = async (id) => {
    if (!user?.token || !window.confirm("Удалить запись?")) return;
    try {
      const updatedList = await deleteTransaction(id, user.token);
      setExpenses(updatedList.map(formatExpense));
      toast.success("Транзакция удалена!");
      if (activeExpenseId === id) {
        setActiveExpenseId(null);
        setEditData(null);
      }
    } catch (error) {
      const message = error.message || "Ошибка при удалении";
      toast.error(error.message.includes("401") ? "Войдите в систему" : message);
    }
  };

  // Обработка отправки формы
  const handleFormSubmit = async (data) => {
    if (!user?.token) {
      toast.error("Токен отсутствует, войдите в систему");
      return { success: false };
    }
    try {
      if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date))
        throw new Error("Неверный формат даты");
      const categoryValue = categories.find((cat) => cat.label === data.categoryLabel)?.value;
      if (!categoryValue) throw new Error("Неверная категория");
      const parsedDate = parse(data.date, "yyyy-MM-dd", new Date());
      const isoDate = format(parsedDate, "yyyy-MM-dd'T00:00:00.000Z'");
      const transactionData = {
        ...data,
        _id: data.id,
        sum: Number(data.amount),
        category: categoryValue,
        date: isoDate,
      };
      const updatedList = await addOrUpdateTransaction(transactionData, user.token);
      setExpenses(updatedList.map(formatExpense));
      setActiveExpenseId(null);
      setEditData(null);
      toast.success("Транзакция сохранена!");
      return { success: true };
    } catch (error) {
      const message = error.message || "Ошибка при сохранении";
      toast.error(error.message.includes("401") ? "Войдите в систему" : message);
      return { success: false };
    }
  };

  // Обработка отмены редактирования
  const handleCancel = () => {
    setActiveExpenseId(null);
    setEditData(null);
  };

  // Переключение на мобильную версию
  const isDesktop = window.innerWidth > 768;

  return isDesktop ? (
    <>
      <Header currentPath="/" />
      <Container>
        <ContentWrapper>
          <MainTitle>Мои расходы</MainTitle>
          <TableAndFormWrapper>
            <TableSection>
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
                onEdit={handleEdit}
                onDelete={handleDelete}
                activeExpenseId={activeExpenseId}
              />
            </TableSection>
            <FormSection>
              <ExpenseForm editData={editData} onSubmit={handleFormSubmit} onCancel={handleCancel} />
            </FormSection>
          </TableAndFormWrapper>
        </ContentWrapper>
      </Container>
    </>
  ) : (
    <MainPageMobile
      expenses={expenses}
      activeExpenseId={activeExpenseId}
      filterCategory={filterCategory}
      setFilterCategory={setFilterCategory}
      sortBy={sortBy}
      setSortBy={setSortBy}
      editData={editData}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
    />
  );
};

export default MainPage;