import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const Content = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  text-align: center;
`;

const CanvasPanel = styled.canvas`
  max-width: 100%;
  height: 300px;
  margin-top: 20px;
`;

const SpendingAnalysisPage = () => {
  useEffect(() => {
    const canvas = document.getElementById('analysisChart');
    const ctx = canvas.getContext('2d');
    const data = [3500, 730, 1200, 950, 1320, 400, 600, 2360, 1000, 4300, 320, 1360, 2320, 1220, 920, 840, 920]; // Sample data from expenses
    const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / data.length - 10;
    const maxValue = Math.max(...data);
    const barHeightScale = canvas.height / maxValue;

    data.forEach((value, index) => {
      const height = value * barHeightScale;
      ctx.fillStyle = '#00C853';
      ctx.fillRect(index * (barWidth + 10), canvas.height - height, barWidth, height);
      ctx.fillStyle = '#000';
      ctx.fillText(value, index * (barWidth + 10), canvas.height - height - 5, barWidth);
    });
  }, []);

  return (
    <>
      <Header currentPath="/spending-analysis" />
      <Container>
        <Content>
          <h2>Анализ расходов</h2>
          <CanvasPanel id="analysisChart" width="600" height="300"></CanvasPanel>
        </Content>
      </Container>
    </>
  );
};

export default SpendingAnalysisPage;