import Header from '../components/Header';
import Analytics from '../components/analytics/Analytics';
import Calendar from '../components/calendar/Calendar';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

// --- Стили для страницы ---
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SpendingAnalysisWrapper = styled.div`
  padding: 10px 20px;
`;

const PageTitle = styled.h2`
  padding-top: 36px;
`;

const AnalysisContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 20px; // Отступ между календарем и аналитикой
`;

/**
 * Страница анализа расходов
 * Позволяет выбрать период и посмотреть аналитику по расходам
 */
const SpendingAnalysisPage = () => {
  // Выбранный пользователем период (строка)
  const [selectedPeriod, setSelectedPeriod] = useState('');
  // Список расходов (загружается из localStorage)
  const [expenses, setExpenses] = useState([]);

  // Загружаем расходы из localStorage (где их сохраняет MainPage)
  useEffect(() => {
    function loadExpensesFromStorage() {
      const savedExpenses = localStorage.getItem('expenses');
      if (savedExpenses) {
        try {
          setExpenses(JSON.parse(savedExpenses));
        } catch (e) {
          console.error('Ошибка при разборе расходов', e);
        }
      }
    }
    loadExpensesFromStorage();
    // Подписываемся на изменения в localStorage (например, если расходы изменились в другой вкладке)
    window.addEventListener('storage', loadExpensesFromStorage);
    return () => window.removeEventListener('storage', loadExpensesFromStorage);
  }, []);

  // --- UI ---
  return (
    <>
      {/* Шапка сайта */}
      <Header currentPath="/spending-analysis" />
      <ContentWrapper>
        <SpendingAnalysisWrapper>
          {/* Заголовок страницы */}
          <PageTitle>Анализ расходов</PageTitle>
          <AnalysisContainer>
            {/* Календарь для выбора периода */}
            <Calendar onPeriodChange={setSelectedPeriod} expenses={expenses} />
            {/* Аналитика по выбранному периоду */}
            <Analytics period={selectedPeriod} expenses={expenses} />
          </AnalysisContainer>
        </SpendingAnalysisWrapper>
      </ContentWrapper>
    </>
  );
};

export default SpendingAnalysisPage;