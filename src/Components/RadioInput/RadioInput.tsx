import React from 'react';
import styles from "./RadioInput.module.scss";
import clsx from 'clsx';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioInputProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  options,
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={clsx(styles.radioGroup, className)}>
      {options.map((option) => (
        <label key={option.value} className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioInput;