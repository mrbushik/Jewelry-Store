import React from "react";
import { fieldTarget } from "../interfaces";

type textFieldProps = {
  name: string;
  value: string;
  onChange(target: fieldTarget): void;
  placeholder: string;
  label?: string;
  type?: string;
};

const TextField: React.FC<textFieldProps> = ({
  name,
  onChange,
  value,
  placeholder,
  label,
  type,
}) => {
  const handleChange = (e: any) => {
    onChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className="mb-3">
      <div className="input-group has-validation">
        <p className="d-block mb-1">{label}</p>
        <input
          className="text-field"
          placeholder={placeholder ? placeholder : ""}
          id={name}
          type={type === "password" ? type : "text"}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TextField;
