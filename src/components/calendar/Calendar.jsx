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

/**
 * Календарь для выбора периода (месяц или год)
 * Позволяет выбрать диапазон дат или месяцев и сообщает выбранный период через onPeriodChange
 */
const Calendar = ({ onPeriodChange }) => {
  // Режим отображения: 'month' — по дням, 'year' — по месяцам
  const [viewMode, setViewMode] = useState('month');

  // Для выбора диапазона дней
  const [selectedStartDay, setSelectedStartDay] = useState(null);
  const [selectedEndDay, setSelectedEndDay] = useState(null);

  // Для выбора диапазона месяцев
  const [selectedStartMonth, setSelectedStartMonth] = useState(null);
  const [selectedEndMonth, setSelectedEndMonth] = useState(null);

  /**
   * Обработка клика по дню в режиме "месяц"
   * Позволяет выбрать диапазон дат (от и до)
   */
  function handleDayClick(date) {
    let start = selectedStartDay;
    let end = selectedEndDay;

    if (start && end) {
      // Если уже выбран диапазон — сбрасываем выбор (3-й клик)
      setSelectedStartDay(null);
      setSelectedEndDay(null);
      updatePeriodLabel(null, null);
      return;
    }
    if (!start) {
      // Если ничего не выбрано — выбираем старт
      start = date;
      end = null;
    } else {
      // Если выбран только старт — определяем конец диапазона
      if (new Date(date) < new Date(start)) {
        end = start;
        start = date;
      } else {
        end = date;
      }
    }
    setSelectedStartDay(start);
    setSelectedEndDay(end);
    updatePeriodLabel(start, end);
  }

  /**
   * Обработка клика по месяцу в режиме "год"
   * Позволяет выбрать диапазон месяцев (от и до)
   */
  function handleMonthClick(year, month) {
    const monthKey = `${year}-${String(month).padStart(2, '0')}`;
    let start = selectedStartMonth;
    let end = selectedEndMonth;

    if (start && end) {
      // Если уже выбран диапазон — сбрасываем выбор
      setSelectedStartMonth(null);
      setSelectedEndMonth(null);
      updatePeriodLabel(null, null);
      return;
    }
    if (!start) {
      setSelectedStartMonth(monthKey);
      updatePeriodLabel(monthKey, null);
    } else {
      // Определяем порядок месяцев
      const [startYear, startMonth] = start.split('-').map(Number);
      if (year < startYear || (year === startYear && month < startMonth)) {
        setSelectedEndMonth(start);
        setSelectedStartMonth(monthKey);
        updatePeriodLabel(monthKey, start);
      } else {
        setSelectedEndMonth(monthKey);
        updatePeriodLabel(start, monthKey);
      }
    }
  }

  /**
   * Обновляет отображаемый период и сообщает его родителю
   */
  function updatePeriodLabel(start, end) {
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
  }

  // --- UI ---
  return (
    <CalendarWrapper>
      {/* Заголовок и переключатель режима */}
      <CalendarHeader>
        <CalendarTitle>Период</CalendarTitle>
        <ViewToggle>
          <ToggleButton
            $isActive={viewMode === 'month'}
            onClick={() => {
              setViewMode('month');
              updatePeriodLabel(selectedStartDay, selectedEndDay);
            }}
          >
            Месяц
          </ToggleButton>
          <ToggleButton
            $isActive={viewMode === 'year'}
            onClick={() => {
              setViewMode('year');
              updatePeriodLabel(selectedStartMonth, selectedEndMonth);
            }}
          >
            Год
          </ToggleButton>
        </ViewToggle>
      </CalendarHeader>

      {/* В зависимости от режима — показываем дни или месяцы */}
      {viewMode === 'month' ? (
        <>
          {/* Заголовки дней недели */}
          <WeekdaysHeader>
            {WEEKDAYS_SHORT.map(day => (
              <Weekday key={day}>{day}</Weekday>
            ))}
          </WeekdaysHeader>

          {/* Несколько месяцев для выбора дат */}
          <ScrollContainer>
            <MonthView
              month={7}
              year={2024}
              title="Июль 2024"
              startDate={selectedStartDay}
              endDate={selectedEndDay}
              onDayClick={handleDayClick}
            />
            <MonthView
              month={8}
              year={2024}
              title="Август 2024"
              startDate={selectedStartDay}
              endDate={selectedEndDay}
              onDayClick={handleDayClick}
            />
            <MonthView
              month={9}
              year={2024}
              title="Сентябрь 2024"
              startDate={selectedStartDay}
              endDate={selectedEndDay}
              onDayClick={handleDayClick}
            />
          </ScrollContainer>
        </>
      ) : (
        <YearView
          years={[2024, 2025]}
          startMonth={selectedStartMonth}
          endMonth={selectedEndMonth}
          onMonthClick={handleMonthClick}
        />
      )}
    </CalendarWrapper>
  );
};

export default Calendar;