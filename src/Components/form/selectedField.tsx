import React, { useState } from "react";
import { fieldTarget, filterPrice } from "../interfaces";

type selectedFieldProps = {
  value: any;
  onChange(target: fieldTarget): void;
  defaultOption: string;
  options: filterPrice[];
  name: string;
  label?: string;
  error?: string;
};

const SelectedField: React.FC<selectedFieldProps> = ({
  value,
  onChange,
  defaultOption,
  options,
  name,
  label,
  error,
}) => {
  let currentValue = value;

  const handleChange = (event: any) => {
    onChange({
      name: event.target.name,
      value: options.find(
        (item: filterPrice) => item.name === event.target.value
      ),
    });
  };

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={currentValue || ""}
        onChange={handleChange}
      >
        <option disabled value={""}>
          {defaultOption}
        </option>
        {options.map((option: filterPrice, index) => (
          <option value={option.name} key={index}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="invalid-feedback text-danger">{error}</p>}
    </div>
  );
};

export default SelectedField;
