import "./App.css";
import { GlobalStyle } from "./components/global-style/GlobalStyle.style";
import AppRoutes from "./components/routes/AppRoutes";

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
    </>
  );
}

export default App;