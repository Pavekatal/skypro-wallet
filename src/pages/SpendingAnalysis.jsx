import Header from '../components/Header';
import Analytics from '../components/analytics/Analytics';
import Calendar from '../components/calendar/Calendar';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

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
  gap: 20px; // Добавляем отступ между календарем и аналитикой
`;


const SpendingAnalysisPage = () => {
  const [period, setPeriod] = useState('');
  const [expenses, setExpenses] = useState([]);

  // Загружаем расходы из localStorage (где их сохраняет MainPage)
  useEffect(() => {
    const loadExpenses = () => {
      const savedExpenses = localStorage.getItem('expenses');
      if (savedExpenses) {
        try {
          setExpenses(JSON.parse(savedExpenses));
        } catch (e) {
          console.error('Failed to parse expenses', e);
        }
      }
    };

    loadExpenses();
    // Подписываемся на изменения в localStorage
    window.addEventListener('storage', loadExpenses);
    return () => window.removeEventListener('storage', loadExpenses);
  }, []);

  return (
     <>
      <Header currentPath="/spending-analysis" />
      <ContentWrapper>
        <SpendingAnalysisWrapper>
          <PageTitle>Анализ расходов</PageTitle>
          <AnalysisContainer>
            <Calendar 
              onPeriodChange={setPeriod} 
              expenses={expenses}
            />
            <Analytics period={period} expenses={expenses} />
          </AnalysisContainer>
        </SpendingAnalysisWrapper>
      </ContentWrapper>
    </>
  );
};

export default SpendingAnalysisPage;