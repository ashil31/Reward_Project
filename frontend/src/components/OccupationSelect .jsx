import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const occupations = [
  "Electrical",
  "Plumber",
  "Business",
  "Job",
  "Other",
];

const OccupationSelect = ({ handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Occupation");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    handleChange({ target: { name: "occupation", value } });
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-4 py-3 text-left text-sm rounded-xl border border-gray-300 dark:border-gray-700
                   bg-white/70 dark:bg-[#1c1c1c]/70 backdrop-blur-md shadow-md
                   text-gray-900 dark:text-white transition-all duration-300 flex justify-between items-center"
      >
        {selected}
        <FaChevronDown
          className={`ml-2 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          } text-gray-500 dark:text-gray-300`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute z-50 mt-2 w-full bg-white dark:bg-[#1c1c1c] rounded-xl border border-gray-300 dark:border-gray-700 shadow-xl overflow-hidden transition-all duration-300"
        >
          {occupations.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 text-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-[#2c2c2c] transition"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OccupationSelect;
