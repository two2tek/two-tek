import React, { useState } from "react";
import Image from "next/image";

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between bg-white px-3 py-2 rounded-full cursor-pointer transition-all duration-300 ${
          isOpen ? "" : ""
        }`}
        onClick={toggleMenu}
        style={{ minHeight: "40px" }} // Înălțimea fixă
      >
        <span className="text-gray-700">Selectează limba</span>
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

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Engleză
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Rusă
              </a>
            </li>
            {/* Adăugați mai multe opțiuni aici */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;