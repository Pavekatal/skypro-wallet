import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      // вставить свой компонент и составляющие главной страницы, напр., Header
      <div>MainPage</div>
      <Outlet />
    </>
  );
};

export default MainPage;
