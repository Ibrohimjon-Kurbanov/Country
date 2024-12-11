import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
function MainLayaut({ children }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleChangeTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <>
      <header className="py-6 bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)] dark:bg-[#2B3844] dark:text-white dark:shadow-md">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-[#111517] leading-[33px] dark:text-white ">
            {t("Where in the world?")}
          </h1>
          <div className="flex items-center gap-3">
            <div
              onClick={handleChangeTheme}
              className="flex items-center gap-3"
            >
              <i
                className={`cursor-pointer text-2xl ${
                  theme === "light" ? " fa-solid fa-moon " : "fa-regular fa-sun"
                }`}
              ></i>
              <h3 className="text-[16px] select-none font-semibold leading-[22px] text-[#111517] cursor-pointer dark:text-white">
                {t(theme === "light" ? "Dark Mode" : "Light Mode")}
              </h3>
            </div>

            <i
              onClick={handleLogout}
              className="fa-solid fa-right-from-bracket text-[25px] text-gray-500 ml-2 cursor-pointer dark:text-white"
            ></i>
          </div>
        </div>
      </header>

      {children}
    </>
  );
}

export default MainLayaut;
