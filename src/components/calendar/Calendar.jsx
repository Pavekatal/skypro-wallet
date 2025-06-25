import { useState } from 'react';
import styled from 'styled-components';

const Calendar = ({ onPeriodChange }) => {
  const [viewMode, setViewMode] = useState('month');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day} ${getMonthName(month)} ${year}`;
  };

  const formatMonth = (monthKey) => {
    if (!monthKey) return '';
    const [year, month] = monthKey.split('-').map(Number);
    return `${getMonthName(month, true)} ${year}`;
  };

  const getMonthName = (month, fullForm = false) => {
    const monthNames = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const monthNamesFull = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return fullForm ? monthNamesFull[month - 1] : monthNames[month - 1];
  };

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

  const isDaySelected = (date) => date === startDate || date === endDate;
  
  const isDayInRange = (date) => {
    if (startDate && endDate) {
      const current = new Date(date);
      return current >= new Date(startDate) && current <= new Date(endDate);
    }
    return false;
  };

  const selectMonth = (year, month) => {
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    
    if (!startMonth || (startMonth && endMonth)) {
      setStartMonth(monthKey);
      setEndMonth(null);
    } else {
      const [y1, m1] = startMonth.split('-').map(Number);
      if (year < y1 || (year === y1 && month < m1)) {
        setEndMonth(startMonth);
        setStartMonth(monthKey);
      } else {
        setEndMonth(monthKey);
      }
    }
    
    // Обновляем отображение периода
    updatePeriodDisplay(
      startMonth && endMonth ? null : startMonth || monthKey,
      startMonth && !endMonth ? monthKey : null
    );
  };

  const isMonthSelected = (year, month) => {
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    return monthKey === startMonth || monthKey === endMonth;
  };
  
  const isMonthInRange = (year, month) => {
    if (startMonth && endMonth) {
      const monthKey = `${year}-${String(month).padStart(2, '0')}`;
      const start = new Date(`${startMonth}-01`);
      const end = new Date(`${endMonth}-01`);
      const current = new Date(`${monthKey}-01`);
      return current >= start && current <= end;
    }
    return false;
  };

  const renderMonthCalendar = (month, year, title) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay() || 7;

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
                onClick={() => selectDay(dateStr)}
              >
                {day}
              </DayCell>
            );
          })}
        </DaysGrid>
      </MonthContainer>
    );
  };

  const renderYearView = () => {
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    return (
      <ScrollContainer>
        <YearContainer>
          <YearHeader>2024</YearHeader>
          <MonthsGrid>
            {monthNames.map((month, index) => {
              const monthNum = index + 1;
              const selected = isMonthSelected(2024, monthNum);
              const inRange = isMonthInRange(2024, monthNum);
              
              return (
                <MonthCell
                  key={`2024-${monthNum}`}
                  $isSelected={selected}
                  $isInRange={inRange}
                  onClick={() => selectMonth(2024, monthNum)}
                >
                  {month}
                </MonthCell>
              );
            })}
          </MonthsGrid>
        </YearContainer>

        <YearContainer>
          <YearHeader>2025</YearHeader>
          <MonthsGrid>
            {monthNames.map((month, index) => {
              const monthNum = index + 1;
              const selected = isMonthSelected(2025, monthNum);
              const inRange = isMonthInRange(2025, monthNum);
              
              return (
                <MonthCell
                  key={`2025-${monthNum}`}
                  $isSelected={selected}
                  $isInRange={inRange}
                  onClick={() => selectMonth(2025, monthNum)}
                >
                  {month}
                </MonthCell>
              );
            })}
          </MonthsGrid>
        </YearContainer>
      </ScrollContainer>
    );
  };

  const renderMonthView = () => (
    <>
      <WeekdaysHeader>
        {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map(day => (
          <Weekday key={day}>{day}</Weekday>
        ))}
      </WeekdaysHeader>
      
      <ScrollContainer>
        {renderMonthCalendar(7, 2024, 'Июль 2024')}
        {renderMonthCalendar(8, 2024, 'Август 2024')}
        {renderMonthCalendar(9, 2024, 'Сентябрь 2024')}
      </ScrollContainer>
    </>
  );

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

      {viewMode === 'month' ? renderMonthView() : renderYearView()}
    </CalendarWrapper>
  );
};


const CalendarWrapper = styled.div`
  width: 320px;
  height: 540px;
  border-radius: 20px;
  background: white;
  font-family: sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-right: 32px;
`;

const CalendarHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarTitle = styled.h2`
  font-size: 20px;
  margin: 0;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 12px;
`;

const ToggleButton = styled.span`
  cursor: pointer;
  color: ${({ $isActive }) => $isActive ? '#24A148' : '#000'};
  font-weight: ${({ $isActive }) => $isActive ? 600 : 400};
  text-decoration: ${({ $isActive }) => $isActive ? 'underline' : 'none'};
  transition: all 0.2s ease;

  &:hover {
    color: #24A148;
    font-weight: 600;
  }
`;

const WeekdaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  color: gray;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`;

const Weekday = styled.div`
  padding: 5px 0;
`;

const ScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 20px;
`;

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

const DayCell = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${({ $isSelected, $isInRange }) => 
    $isSelected ? '#CFF8E2' :
    $isInRange ? '#EAF9F1' : '#f5f5f5'};
  color: ${({ $isSelected }) => ($isSelected ? '#24A148' : '#000')};
  font-weight: ${({ $isSelected }) => ($isSelected ? 'bold' : 'normal')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #e0f2e8;
  }
`;

const EmptyDayCell = styled.div`
  width: 35px;
  height: 35px;
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
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : 'normal')};
  border-radius: 999px;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #E0F2E8;
    color: #24A148;
    font-weight: 600;
  }
`;

export default Calendar;