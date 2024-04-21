import { useState } from "react";

interface FormInputProps {
  label: string;
}

export const FormInput = ({ label }: FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="bg-gray-200 rounded-md relative ">
      <label
        htmlFor={label.toLowerCase()}
        className={`absolute left-4 text-gray-600 transition-label-form duration-100 ease-linear ${
          focused || !!value ? "top-1 text-xs" : "top-1/4 text-base"
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        autoComplete="off"
        className="bg-transparent w-full pb-2 mt-5 px-4 outline-none"
        name={label.toLowerCase()}
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(!focused)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};
