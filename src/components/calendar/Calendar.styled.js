import styled from 'styled-components';

export const CalendarWrapper = styled.div`
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

export const CalendarHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CalendarTitle = styled.h2`
  font-size: 20px;
  margin: 0;
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: 12px;
`;

export const ToggleButton = styled.span`
  cursor: pointer;
  color: ${({ $isActive }) => $isActive ? '#24A148' : '#000'};
  font-weight: ${({ $isActive }) => $isActive ? 600 : 400};
  text-decoration: ${({ $isActive }) => $isActive ? 'underline' : 'none'};
  transition: all 0.2s ease;
  min-width: 40px;
  text-align: center;
  display: inline-block;

  &:hover {
    color: #24A148;
    font-weight: 600;
  }
`;

export const WeekdaysHeader = styled.div`
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

export const Weekday = styled.div`
  padding: 5px 0;
`;

export const ScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 20px;
`;