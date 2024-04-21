import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export interface DataSelect {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  data: DataSelect[];
  optionDefault?: string;
}

export const FormSelect = ({ label, optionDefault, data }: FormSelectProps) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("0");

  return (
    <div className="bg-gray-200 rounded-md relative ">
      <label
        htmlFor={label.toLowerCase()}
        className={`absolute left-4 text-gray-600 ${
          focused || !!value ? "top-1 text-xs" : "top-1/4 text-base"
        }`}
      >
        {label}
      </label>
      <select
        className="bg-transparent w-full pb-2 mt-5 px-3 appearance-none outline-none"
        name={label.toLowerCase()}
        id={label.toLowerCase()}
        onChange={(e) => setValue(e.target.value)}
        onClick={() => setFocused(!focused)}
        onBlur={() => setFocused(false)}
      >
        <option value="0">
          {!!optionDefault ? optionDefault : "Selecciona una opción"}
        </option>
        {data.map(({ label, value }, index) => (
          <option value={value} key={index}>
            {label}
          </option>
        ))}
      </select>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`absolute right-3 top-1/3 text-sm ${
          focused ? "-rotate-180" : "rotate-0"
        }`}
      />
    </div>
  );
};
