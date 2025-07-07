# SkyproWallet

Приложение-кошелек для управления своими расходами с возможностью авторизации и регистрации. 

## Установка приложения: 
- Установить окружение (VS Code, Git Hub);
- Скопировать проект с использваонием команды git clone;
- Установить все зависимости с использованием команды: npm install;
- Запустить приложение, напр., в режиме разработки запустить команду npm run dev. Для запуска приложения в ином режиме рекомендуется ознакомиться с файлом package.json. 

## В приложении реализован следующий функционал: 
- Авторизация и регистрация; 
- Просмотр всех своих расходов;
- Добавление, редактирование, удаление расходов;
- Просмотр статистики расходов за определенный период. 

## Используемые библиотеки: 
- Styled Components (для стилизации);
- React Router (для маршрутизации между страницами);
- axios (для работы с АПИ);
- Chart.js (для работы с графиками);
- React-Toastify (для работы с уведомлениями для пользователей). 

***настройки ESLint устновлены по умолчанию (правила не изменены после установки). 

## Структура проекта (папки): 
- assets (для изображений, шрифтов и других статических файлов)
- components (для компонентов, каждый компонент обернут в свою папку)
  -- auth-form 
  -- buttons 
  -- calendar
  -- inputs
- context (пока просто создала, дальше будет использована при работе с АПИ)
- pages (для страниц проекта) 
- services (для запросов АПИ)
- utils (для различных вспомогательных функций и файлов, напр., форматирование дат, хранение различных массивов).

## Над проектом работали: 
- Павлова Екатерина: инициализация проекта, реализация авторизации и регистрации, разработка всего функционала страницы, работа с АПИ-запросами;
- Баранова Евгения: реализация главной страницы приложения, разработка всего функционала страницы, работа с АПИ-запросами;
- Масленский Юрий: реаизация страницы анализа расходов, разработка всего функционала страницы, работа с АПИ-запросами. 

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
