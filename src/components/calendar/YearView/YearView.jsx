import React from 'react';
import styled from 'styled-components';
import { MONTH_NAMES } from '../constants/constant.js';
import { isMonthInRange } from '../dateUtils.js';

const YearView = ({ 
  years, 
  startMonth, 
  endMonth, 
  onMonthClick 
}) => {
  const isMonthSelected = (year, month) => {
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    return monthKey === startMonth || monthKey === endMonth;
  };

  return (
    <ScrollContainer>
      {years.map(year => (
        <YearContainer key={year}>
          <YearHeader>{year}</YearHeader>
          <MonthsGrid>
            {MONTH_NAMES.map((month, index) => {
              const monthNum = index + 1;
              const selected = isMonthSelected(year, monthNum);
              const inRange = isMonthInRange(year, monthNum, startMonth, endMonth);
              
              return (
                <MonthCell
                  key={`${year}-${monthNum}`}
                  $isSelected={selected}
                  $isInRange={inRange}
                  onClick={() => onMonthClick(year, monthNum)}
                >
                  {month}
                </MonthCell>
              );
            })}
          </MonthsGrid>
        </YearContainer>
      ))}
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 20px;
`;

const YearContainer = styled.div`
  padding: 20px;
`;

const YearHeader = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const MonthCell = styled.div`
  background: ${({ $isSelected, $isInRange }) => 
    $isSelected ? '#CFF8E2' :
    $isInRange ? '#EAF9F1' : '#F1F1F1'};
  color: ${({ $isSelected }) => ($isSelected ? '#24A148' : '#000')};
  border-radius: 999px;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #E0F2E8;
    color: #24A148;
  }
`;

export default YearView;