import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import MainLayaut from "./layout/MainLayaut";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);
export const LanguageContext = createContext(null);
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saveLocalstorage = localStorage.getItem("theme");
    if (saveLocalstorage) {
      setTheme(saveLocalstorage);
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (location.state?.token) {
      setToken(location.state.token);
    }
  }, [navigate]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      navigate("/login");
    }
  }, []);
  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }
    return children;
  }

  useEffect(() => {
    const body = document.body;
    if (theme === "light") {
      body.classList.remove("dark");
      body.classList.add("light");
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
    }
  }, [theme]);

  return (
    <div>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LanguageContext.Provider value={{ lang, setLang }}>
          <Routes>
            <Route
              index
              element={
                <PrivateRoute isAuth={!!token}>
                  <MainLayaut>
                    <Home />
                  </MainLayaut>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <MainLayaut>
                  <ErrorPage />
                </MainLayaut>
              }
            />
          </Routes>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}
export default App;
