import React from 'react';
import styled from 'styled-components';
import { DayCell, EmptyDayCell } from '../DayCell.styled.js';
import { WEEKDAYS_SHORT } from '../constants/constant.js';

const MonthView = ({ 
  month, 
  year, 
  title, 
  startDate, 
  endDate, 
  onDayClick 
}) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay() || 7;

  const isDaySelected = (date) => date === startDate || date === endDate;
  
  const isDayInRange = (date) => {
    if (startDate && endDate) {
      const current = new Date(date);
      return current >= new Date(startDate) && current <= new Date(endDate);
    }
    return false;
  };

  return (
    <MonthContainer>
      <MonthHeader>{title}</MonthHeader>
      <DaysGrid>
        {Array.from({ length: firstDayOfWeek - 1 }).map((_, i) => (
          <EmptyDayCell key={`empty-${i}`} />
        ))}
        
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          return (
            <DayCell
              key={dateStr}
              $isSelected={isDaySelected(dateStr)}
              $isInRange={isDayInRange(dateStr)}
              onClick={() => onDayClick(dateStr)}
            >
              {day}
            </DayCell>
          );
        })}
      </DaysGrid>
    </MonthContainer>
  );
};

const MonthContainer = styled.div`
  padding: 20px;
`;

const MonthHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

export default MonthView;