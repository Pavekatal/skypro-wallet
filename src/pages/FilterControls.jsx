import React from 'react';
import styled from 'styled-components';

// Обёртка для контролов фильтрации и сортировки
const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 130px;
`;

// Стилизованный Label (фильтр/сортировка)
const Label = styled.label`
  font-size: 12px;
  color: #000000;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: ${props => (props.type === 'filter' ? '168px' : '100px')};
  height: 18px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

// Стилизованный Select (фильтр/сортировка)
const Select = styled.select`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  border: none;
  background: none;
  color: #000000;
  transition: border-color 0.3s ease;
  width: ${props => (props.type === 'filter' ? '168px' : '100px')};
  height: 18px;
  appearance: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:focus {
    outline: none;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #1FA46C;
    transition: width 0.3s ease;
  }

  &:focus:after,
  &:hover:after {
    width: 100%;
  }
`;

// Стилизованный SVG (стрелочка)
const Arrow = styled.svg`
  margin-left: 2px;
`;

const FilterControls = ({ filterCategory, setFilterCategory, sortBy, setSortBy }) => {
  return (
    <ControlsWrapper>
      <Label type="filter">
        Фильтровать по категории
        <Arrow width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 5.5L0.468911 0.25L6.53109 0.25L3.5 5.5Z" fill="black"/>
        </Arrow>
      </Label>
      <Select
        type="filter"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">Все</option>
        <option value="Еда">Еда</option>
        <option value="Транспорт">Транспорт</option>
        <option value="Жилье">Жилье</option>
        <option value="Развлечения">Развлечения</option>
        <option value="Образование">Образование</option>
        <option value="Другое">Другое</option>
      </Select>
      <Label type="sort">
        Сортировать по
        <Arrow width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 5.5L0.468911 0.25L6.53109 0.25L3.5 5.5Z" fill="black"/>
        </Arrow>
      </Label>
      <Select
        type="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Нет</option>
        <option value="date">Дата</option>
        <option value="amount">Сумма</option>
      </Select>
    </ControlsWrapper>
  );
};

export default FilterControls;