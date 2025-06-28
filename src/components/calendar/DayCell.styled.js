import styled from 'styled-components';

export const DayCell = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${({ $isSelected, $isInRange }) => 
    $isSelected ? '#CFF8E2' :
    $isInRange ? '#EAF9F1' : '#f5f5f5'};
  color: ${({ $isSelected }) => ($isSelected ? '#24A148' : '#000')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #e0f2e8;
  }
`;

export const EmptyDayCell = styled.div`
  width: 35px;
  height: 35px;
`;