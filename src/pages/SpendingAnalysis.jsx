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
        <div style={{ padding: '10px 20px' }}>
          <h2 style={{ paddingTop: '36px' }}>Анализ расходов</h2>
          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
            <Calendar 
              onPeriodChange={setPeriod} 
              expenses={expenses}
            />
            <Analytics period={period} expenses={expenses} />
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default SpendingAnalysisPage;