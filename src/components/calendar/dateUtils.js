import { MONTH_NAMES, MONTH_NAMES_GENITIVE } from './constants/constant.js';

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day} ${getMonthName(month)} ${year}`;
};

export const formatMonth = (monthKey) => {
  if (!monthKey) return '';
  const [year, month] = monthKey.split('-').map(Number);
  return `${getMonthName(month, true)} ${year}`;
};

export const getMonthName = (month, fullForm = false) => {
  return fullForm ? MONTH_NAMES[month - 1] : MONTH_NAMES_GENITIVE[month - 1];
};

export const isDateInRange = (date, startDate, endDate) => {
  if (!startDate || !endDate) return false;
  const current = new Date(date);
  return current >= new Date(startDate) && current <= new Date(endDate);
};

export const isMonthInRange = (year, month, startMonth, endMonth) => {
  if (!startMonth || !endMonth) return false;
  const monthKey = `${year}-${String(month).padStart(2, '0')}`;
  const start = new Date(`${startMonth}-01`);
  const end = new Date(`${endMonth}-01`);
  const current = new Date(`${monthKey}-01`);
  return current >= start && current <= end;
};