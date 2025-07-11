import React, { useState } from "react";
import styled from "styled-components";
import { categories } from "../constants/categories";

const FilterControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.625rem;
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  background: #ffffff;
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f4f5f6;
  }

  .selected {
    color: #1fa46c;
    text-decoration: underline;
  }

  svg.arrow {
    margin-left: 0.375rem;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;
    width: 100%;
    text-align: left;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 11rem;
  max-height: 15rem;
  border: 0.03125rem solid #999999;
  border-radius: 0.375rem;
  padding: 0.75rem;
  gap: 0.625rem;
  background: #ffffff;
  box-shadow: 0 1.25rem 4.1875rem -0.75rem rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 9.375rem;
    left: auto;
    right: 0;
  }
`;

const ModalItem = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem;
  border: none;
  background: ${({ selected }) => (selected ? "#DBFFE9" : "#F4F5F6")};
  color: ${({ selected }) => (selected ? "#1FA46C" : "#333")};
  font-family: "Montserrat", sans-serif;
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
  border-radius: 1.875rem;
  transition: background 0.3s ease;

  svg.icon {
    margin-right: 0.375rem;
  }

  &:hover {
    background: #f4f5f6;
  }

  ${({ selected }) =>
    selected &&
    `
      svg.icon path {
        fill: #1FA46C;
      }
    `}

  @media (max-width: 768px) {
    padding: 0.375rem;
    font-size: 0.75rem;
  }
`;

const ArrowIcon = () => (
  <svg className="arrow" width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 5.5L0.468911 0.25L6.53109 0.25L3.5 5.5Z" fill="#1FA46C" />
  </svg>
);

// Компонент фильтров и сортировки
const FilterControls = ({ filterCategory, setFilterCategory, sortBy, setSortBy }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const sortOptions = [
    { display: "Без сортировки", value: "" },
    { display: "По дате", value: "date" },
    { display: "По сумме", value: "sum" },
  ];

  // Обработка выбора фильтра
  const handleFilterSelect = (value) => {
    setFilterCategory(value);
    setIsFilterModalOpen(false);
  };

  // Обработка выбора сортировки
  const handleSortSelect = (value) => {
    setSortBy(value);
    setIsSortModalOpen(false);
  };

  return (
    <FilterControlsWrapper>
      <div style={{ position: "relative" }}>
        <FilterButton onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}>
          Фильтровать по:{" "}
          <span className={filterCategory !== "" ? "selected" : ""}>
            {filterCategory !== ""
              ? categories.find((cat) => cat.value === filterCategory)?.label
              : "Все категории"}
            {filterCategory !== "" && <ArrowIcon />}
          </span>
        </FilterButton>
        {isFilterModalOpen && (
          <Modal>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <ModalItem
                  key={category.value}
                  selected={filterCategory === category.value}
                  onClick={() => handleFilterSelect(category.value)}
                >
                  {IconComponent && <IconComponent className="icon" />}
                  {category.label}
                </ModalItem>
              );
            })}
          </Modal>
        )}
      </div>
      <div style={{ position: "relative" }}>
        <FilterButton onClick={() => setIsSortModalOpen(!isSortModalOpen)}>
          Сортировать по:{" "}
          <span className={sortBy !== "" ? "selected" : ""}>
            {sortBy !== "" ? sortOptions.find((opt) => opt.value === sortBy)?.display : "Без сортировки"}
            {sortBy !== "" && <ArrowIcon />}
          </span>
        </FilterButton>
        {isSortModalOpen && (
          <Modal>
            {sortOptions.map((option) => (
              <ModalItem
                key={option.value}
                selected={sortBy === option.value}
                onClick={() => handleSortSelect(option.value)}
              >
                {option.display}
              </ModalItem>
            ))}
          </Modal>
        )}
      </div>
    </FilterControlsWrapper>
  );
};

export default FilterControls;