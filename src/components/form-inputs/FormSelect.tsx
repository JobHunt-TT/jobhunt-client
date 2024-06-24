import { ChangeEvent, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataSelect } from "../../types";

interface FormSelectProps {
  label: string;
  name: string;
  data: DataSelect[];
  optionDefault?: string;
  onChangeInput?: () => void;
  onBlurInput?: () => void;
}

export const FormSelect = ({
  label,
  name,
  optionDefault,
  data,
  onChangeInput,
  onBlurInput,
}: FormSelectProps) => {
  const [focused, setFocused] = useState(false);
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error }, field: { value, onChange } }) => {
        const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
              className={`absolute left-4 transition-label-form duration-100 ease-linear text-gray-600 top-1 text-xs`}
            >
              {label}
            </label>
            <select
              className="bg-transparent w-full pb-2 mt-5 px-4 appearance-none outline-none"
              name={label.toLowerCase()}
              id={label.toLowerCase()}
              onChange={(e) => {
                handleChange(e);
                !!onChangeInput && onChangeInput();
              }}
              onClick={() => setFocused(!focused)}
              onBlur={() => {
                setFocused(false);
                !!onBlurInput && onBlurInput();
              }}
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
      }}
    />
  );
};
