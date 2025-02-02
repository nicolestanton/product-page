import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import Image from "next/image";
import ChevronDown from "../../assets/Icons/icons-chevron.png";
export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  id?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  id,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <>
      <div
        ref={dropdownRef}
        className={`${styles.dropdownContainer} ${className}`}
        >
        {label && <label className={styles.label} htmlFor={id}>{label}</label>}
        <button
          type="button"
          className={styles.dropdownButton}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <Image src={ChevronDown} alt="chevron-down" width={24} height={24} />
        </button>

        {isOpen && (
          <ul
            className={styles.optionsList}
            role="listbox"
            aria-activedescendant={value.toString()}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`${styles.option} ${
                  option.value === value ? styles.selected : ""
                }`}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
