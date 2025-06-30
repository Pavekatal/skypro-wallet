import React, { useState } from 'react';
import {
  CalendarWrapper,
  CalendarHeader,
  CalendarTitle,
  ViewToggle,
  ToggleButton,
  WeekdaysHeader,
  Weekday,
  ScrollContainer
} from './Calendar.styled';
import MonthView from './MonthView/MonthView.jsx';
import YearView from './YearView/YearView.jsx';
import { formatDate, formatMonth } from './dateUtils';
import { WEEKDAYS_SHORT } from './constants/constant.js';

const Calendar = ({ onPeriodChange }) => {
  const [viewMode, setViewMode] = useState('month');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);

  const selectDay = (date) => {
    let newStartDate = startDate;
    let newEndDate = endDate;
    
    if (!startDate || (startDate && endDate)) {
      newStartDate = date;
      newEndDate = null;
    } else {
      if (new Date(date) < new Date(startDate)) {
        newEndDate = startDate;
        newStartDate = date;
      } else {
        newEndDate = date;
      }
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    updatePeriodDisplay(newStartDate, newEndDate);
  };

  const updatePeriodDisplay = (start, end) => {
    if (!onPeriodChange) return;
    
    if (viewMode === 'month') {
      if (start && end) {
        onPeriodChange(`${formatDate(start)} - ${formatDate(end)}`);
      } else if (start) {
        onPeriodChange(formatDate(start));
      } else {
        onPeriodChange('');
      }
    } else {
      if (start && end) {
        onPeriodChange(`${formatMonth(start)} - ${formatMonth(end)}`);
      } else if (start) {
        onPeriodChange(formatMonth(start));
      } else {
        onPeriodChange('');
      }
    }
  };

  const selectMonth = (year, month) => {
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    
    if (startMonth && endMonth) {
      setStartMonth(null);
      setEndMonth(null);
      updatePeriodDisplay(null, null);
      return;
    }
    
    if (!startMonth) {
      setStartMonth(monthKey);
    } else {
      const [y1, m1] = startMonth.split('-').map(Number);
      if (year < y1 || (year === y1 && month < m1)) {
        setEndMonth(startMonth);
        setStartMonth(monthKey);
      } else {
        setEndMonth(monthKey);
      }
    }
    
    updatePeriodDisplay(
      startMonth ? startMonth : monthKey,
      startMonth ? monthKey : null
    );
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <CalendarTitle>Период</CalendarTitle>
        <ViewToggle>
          <ToggleButton 
            $isActive={viewMode === 'month'} 
            onClick={() => {
              setViewMode('month');
              updatePeriodDisplay(startDate, endDate);
            }}
          >
            Месяц
          </ToggleButton>
          <ToggleButton 
            $isActive={viewMode === 'year'} 
            onClick={() => {
              setViewMode('year');
              updatePeriodDisplay(startMonth, endMonth);
            }}
          >
            Год
          </ToggleButton>
        </ViewToggle>
      </CalendarHeader>

      {viewMode === 'month' ? (
        <>
          <WeekdaysHeader>
            {WEEKDAYS_SHORT.map(day => (
              <Weekday key={day}>{day}</Weekday>
            ))}
          </WeekdaysHeader>
          
          <ScrollContainer>
            <MonthView 
              month={7} 
              year={2024} 
              title="Июль 2024" 
              startDate={startDate}
              endDate={endDate}
              onDayClick={selectDay}
            />
            <MonthView 
              month={8} 
              year={2024} 
              title="Август 2024" 
              startDate={startDate}
              endDate={endDate}
              onDayClick={selectDay}
            />
            <MonthView 
              month={9} 
              year={2024} 
              title="Сентябрь 2024" 
              startDate={startDate}
              endDate={endDate}
              onDayClick={selectDay}
            />
          </ScrollContainer>
        </>
      ) : (
        <YearView 
          years={[2024, 2025]}
          startMonth={startMonth}
          endMonth={endMonth}
          onMonthClick={selectMonth}
        />
      )}
    </CalendarWrapper>
  );
};

export default Calendar;