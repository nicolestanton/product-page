import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import Image from "next/image";
import ChevronDown from "../../assets/Icons/icons-chevron.png";
import clsx from "clsx";

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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const listId = `${id}-listbox`;
  const labelId = `${id}-label`;

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          handleOptionClick(options[focusedIndex].value);
        }
        event.preventDefault();
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      case "Tab":
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const option = listRef.current.children[focusedIndex] as HTMLElement;
      option.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={clsx(styles.dropdownContainer, className)}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={id}
          className={clsx(styles.label, disabled && styles.labelDisabled)}
        >
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        className={clsx(
          styles.dropdownButton,
          disabled && styles.dropdownDisabled
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={id}
        aria-controls={isOpen ? listId : undefined}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <Image
          src={ChevronDown}
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          id={listId}
          ref={listRef}
          className={styles.optionsList}
          role="listbox"
          aria-label={label || "Options"}
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${option.value}`}
              className={clsx(
                styles.option,
                option.value === value && styles.selected,
                index === focusedIndex && styles.focused
              )}
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
  );
};
