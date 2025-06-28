import "./App.css";
import { GlobalStyle } from "./components/global-style/GlobalStyle.style";
import AppRoutes from "./components/routes/AppRoutes";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
