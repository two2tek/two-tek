/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Translation from "../translate.json";
import useLanguage from "../../public/LanguageContext";

interface Translations {
  translations: {
    ro: {};
    ru: {};
    en: {};
  };
}

export function getTranslatedContent(language: string) {
  const translatedContent =
    language === "ro"
      ? Translation.data.ro
      : language === "ru"
      ? Translation.data.ru
      : Translation.data.en;

  return translatedContent;
}

function TranslationRoToRu() {
  const { language, setLanguage } = useLanguage();
  const [content, setContent] = useState(Translation.data.ro);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const handleLanguageChange = (newLanguage: React.SetStateAction<string>) => {
    setLanguage(newLanguage);
    setIsOpen(false);

    localStorage.setItem("selectedLanguage", newLanguage as string);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    console.log("Language changed:", language);
    setContent(
      language === "ro"
        ? Translation.data.ro
        : language === "ru"
        ? Translation.data.ru
        : Translation.data.en
    );
    setSelectedOption("");
  }, [language]);

  useEffect(() => {
    const handleRouteChange = () => {
      console.log("Route changed. Content:", content);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [content, router.events]);

  useEffect(() => {
    console.log("Selected Option:", selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    console.log("Language changed:", language);
  }, [language]);

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between bg-white px-3 py-2 rounded-full cursor-pointer ${
          isOpen ? "bg-opacity-100" : "bg-opacity-70"
        } transition-all duration-300`}
        onClick={toggleMenu}
        style={{ minHeight: "40px" }}
      >
        <span className="text-gray-700">
          {language === "ro" && Translation.data.ro.language}
          {language === "ru" && Translation.data.ru.language2}
          {language === "en" && Translation.data.en.language3}
        </span>
        <svg
          className={`h-4 w-4 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Apply transition classes to the dropdown menu for both opening and closing */}
      <div
        className={`${
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        } absolute mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-10 transform origin-top transition-transform duration-300`}
      >
        <ul className="divide-y divide-gray-200">
          {language !== "ro" && (
            <li>
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLanguageChange("ro")}
              >
                {language === "ro"
                  ? "Română"
                  : language === "ru"
                  ? "Румынский"
                  : "Romanian"}
              </a>
            </li>
          )}
          {language !== "ru" && (
            <li>
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLanguageChange("ru")}
              >
                {language === "ro"
                  ? "Rusă"
                  : language === "ru"
                  ? "Русский"
                  : "Russian"}
              </a>
            </li>
          )}
          {language !== "en" && (
            <li>
              <a
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLanguageChange("en")}
              >
                {language === "ro"
                  ? "Engleză"
                  : language === "ru"
                  ? "Aнглийский"
                  : "Romanian"}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default TranslationRoToRu;