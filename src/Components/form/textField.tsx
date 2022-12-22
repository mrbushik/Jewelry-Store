import React from "react";
import { fieldTarget } from "../interfaces";

type textFieldProps = {
  name: string;
  value: string;
  onChange(target: fieldTarget): void;
  placeholder: string;
};

const TextField: React.FC<textFieldProps> = ({
  name,
  onChange,
  value,
  placeholder,
}) => {
  const handleChange = (e: any) => {
    onChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className="mb-3">
      <div className="input-group has-validation">
        <input
          placeholder={placeholder ? placeholder : ""}
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TextField;
