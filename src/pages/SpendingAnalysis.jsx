
import Header from '../components/Header';
import  Analytics  from '../components/analytics/Analytics';
import Calendar from '../components/calendar/Calendar';
import styled from 'styled-components';

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

  return (
    <>
      <Header currentPath="/spending-analysis" />
        <ContentWrapper>
          <div style={{padding:'10px 20px'}}>
          <h2 style={{paddingTop:'36px'}}>Анализ расходов</h2>
          <div style={{marginTop:'32px', display:'flex', justifyContent:'center'}}>
          <Calendar/>
          <Analytics />
          </div>
      </div>
        </ContentWrapper>
       
    </>
  );
};

export default SpendingAnalysisPage;