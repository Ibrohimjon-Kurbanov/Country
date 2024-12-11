import { useContext } from "react";
import countries from "../data/countries.json";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../App";
function Home() {
  const { lang, setLang } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  function handleChangeLanguage(e) {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className="container mt-[48px]">
      <form className="filter-wrapper flex items-center justify-between">
        <div className="flex px-[18px] py-[18px] rounded-md w-[480px] bg-white gap-3 shadow-[0px_2px_9px_0px_rgba(0,0,0,0.05)] dark:bg-[#2B3844] dark:text-white dark:shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-gray-600 cursor-pointer dark:fill-white"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
          <input
            type="text"
            placeholder={t("Search for a country")}
            className="w-full outline-none bg-transparent text-gray-600 text-sm dark:text-white dark:placeholder:text-white"
          />
        </div>

        <div className="w-[200px]">
          <select
            value={lang}
            onChange={handleChangeLanguage}
            id="countries"
            className="bg-white text-[#333] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none dark:bg-[#2B3844] dark:border-transparent dark:text-white"
          >
            <option value="en">en</option>
            <option value="ru">ru</option>
            <option value="uz">uz</option>
          </select>
        </div>
      </form>
      <div className="flex flex-wrap justify-between gap-y-[67px] gap-x-5 my-[48px]">
        {countries.map((country, index) => (
          <div
            key={index}
            className="overflow-hidden w-[264px] h-[336px] rounded-md bg-white shadow-[0px_0px_7px_2px_rgba(0,0,0,0.03)] dark:bg-[#2B3844] dark:text-white"
          >
            <img
              className="w-[267px] h-[160px]"
              src={country.flags.svg}
              alt=""
            />
            <div className="country-info pt-6 pl-6 pr-0 pb-[46px]">
              <h2 className="text-[18px] font-extrabold leading-[26px] text-[#111517] tracking-0 mb-[16px] dark:text-white">
                {country.name.common}
              </h2>
              <h3 className="text-[14px] font-bold leading-[16px] tracking-0 text-[#111517] mb-[8px] dark:text-white">
                {t("Population")}
                <span className="font-medium">
                  {" "}
                  {country.population.toLocaleString()}
                </span>
              </h3>

              <h3 className="text-[14px] font-bold leading-[16px] tracking-0 text-[#111517] mb-[8px] dark:text-white">
                {t("Region")}
                <span className="font-medium"> {country.region}</span>
              </h3>
              <h3 className="text-[14px] font-bold leading-[16px] tracking-0 text-[#111517] dark:text-white">
                {t("Capital")}
                <span className="font-medium">
                  {" "}
                  {country.capital ? country.capital : "No capital"}
                </span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
