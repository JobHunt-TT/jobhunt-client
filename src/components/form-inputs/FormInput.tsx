import { ChangeEvent, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "password" | "date";
  disabled?: boolean;
  onChangeInput?: () => void;
  onBlurInput?: () => void;
}

export const FormInput = ({
  label,
  name,
  type = "text",
  disabled = false,
  onChangeInput,
  onBlurInput,
}: FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error }, field: { value, onChange } }) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.value;
          !!onChange && onChange(newValue);
          setValue(name, newValue);
        };
        return (
          <div
            className={`col-span-2 bg-gray-200 rounded-md relative border-2 ${
              !!error && "border-red-400"
            }`}
          >
            <label
              htmlFor={label.toLowerCase()}
              className={`absolute left-4 transition-label-form duration-100 ease-linear ${
                !!error ? "text-red-600" : "text-gray-600"
              } ${
                focused || !!value || type === "date"
                  ? "top-1 text-xs"
                  : "top-1/4 text-base"
              }`}
            >
              {label}
            </label>
            <input
              type={type}
              disabled={disabled}
              autoComplete="off"
              className="bg-transparent w-full pb-2 mt-5 px-4 appearance-none outline-none"
              name={label.toLowerCase()}
              id={label.toLowerCase()}
              value={value ? value : ""}
              onChange={handleChange}
              onFocus={() => {
                setFocused(!focused);
                !!onChangeInput && onChangeInput();
              }}
              onBlur={(e) => {
                setFocused(false);
                !!onBlurInput && onBlurInput();
              }}
            />
          </div>
        );
      }}
    />
  );
};
