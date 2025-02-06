import React from "react";
import styles from "./RadioInput.module.scss";
import clsx from "clsx";

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
  description?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  options,
  value,
  onChange,
  disabled = false,
  className = "",
  description,
}) => {
  const descriptionId = description ? `${name}-description` : undefined;

  return (
    <div className={clsx(styles.radioGroup, className)}>
      <fieldset
        className={styles.fieldset}
        role="radiogroup"
        aria-labelledby={name}
        aria-describedby={descriptionId}
        disabled={disabled}
      >
        {options.map((option) => (
          <label key={option.value} className={styles.radioLabel} htmlFor={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className={styles.radioInput}
              aria-describedby={name}
            />
            <span className={styles.radioText}>{option.label}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default RadioInput;
