import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FoodIcon,
  TransportIcon,
  EntertainmentIcon,
  OtherIcon,
} from '../components/Icons.jsx';

// Маппинг категорий
const categoryMap = {
  Food: 'Еда',
  Transport: 'Транспорт',
  Entertainment: 'Развлечения',
  Others: 'Другое',
};

// ==== Стили ====
const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #000000;
  font-family: 'Montserrat', sans-serif;
`;

const SelectWrapper = styled.div`
  position: relative;
  margin-top: 5px;
`;

const TriggerButton = styled.button`
  width: 160px;
  height: 30px;
  background: none;
  border: none;
  text-align: left;
  font-size: 12px;
  color: #000;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  padding-left: 8px;
  &:focus {
    outline: none;
  }
`;

const Arrow = styled.span`
  position: absolute;
  right: 10px;
  top: 9px;
  width: 7px;
  height: 6px;
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid black;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 15px;
  margin: 2px 0;
  border: none;
  border-radius: 4px;
  background: #f4f5f6;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    margin-right: 6px;
  }

  &:hover {
    background: #e0e0e0;
  }

  ${({ selected }) =>
    selected &&
    `
      background: #DBFFE9;
      color: #1FA46C;
      svg path {
        fill: #1FA46C;
      }
      &:hover {
        background: #C1FFD6;
      }
    `}
`;

const SortButton = styled(CategoryButton)`
  justify-content: flex-start;
`;

// ==== Компонент FilterControls ====
const FilterControls = ({ filterCategory, setFilterCategory, sortBy, setSortBy }) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Список категорий с английскими value и русскими label
  const categories = [
    { value: '', label: 'Все', icon: null },
    { value: 'Food', label: 'Еда', icon: <FoodIcon /> },
    { value: 'Transport', label: 'Транспорт', icon: <TransportIcon /> },
    { value: 'Entertainment', label: 'Развлечения', icon: <EntertainmentIcon /> },
    { value: 'Others', label: 'Другое', icon: <OtherIcon /> },
  ];

  // Список сортировок
  const sortOptions = [
    { value: '', label: 'Нет' },
    { value: 'date', label: 'Дата' },
    { value: 'sum', label: 'Сумма' },
  ];

  return (
    <ControlsWrapper>
      <Label>
        Фильтровать по
        <SelectWrapper type="filter">
          <TriggerButton
            type="button"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            {categoryMap[filterCategory] || filterCategory || 'категории'}
            <Arrow />
          </TriggerButton>

          {showCategoryDropdown && (
            <Dropdown>
              {categories.map((cat) => (
                <CategoryButton
                  key={cat.value}
                  selected={filterCategory === cat.value}
                  onClick={() => {
                    setFilterCategory(cat.value);
                    setShowCategoryDropdown(false);
                  }}
                >
                  {cat.icon && <span>{cat.icon}</span>}
                  {cat.label}
                </CategoryButton>
              ))}
            </Dropdown>
          )}
        </SelectWrapper>
      </Label>

      <Label>
        Сортировать по
        <SelectWrapper type="sort">
          <TriggerButton
            type="button"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            {sortOptions.find((opt) => opt.value === sortBy)?.label || 'Нет'}
            <Arrow />
          </TriggerButton>

          {showSortDropdown && (
            <Dropdown>
              {sortOptions.map((opt) => (
                <SortButton
                  key={opt.value}
                  selected={sortBy === opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setShowSortDropdown(false);
                  }}
                >
                  {opt.label}
                </SortButton>
              ))}
            </Dropdown>
          )}
        </SelectWrapper>
      </Label>
    </ControlsWrapper>
  );
};

export default FilterControls;