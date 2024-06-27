import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface TagsInputProps {
  label: string;
  name: string;
  onChangeInput?: () => void;
  onBlurInput?: () => void;
}

export const FormMultiTagInput = ({
  label,
  name,
  onChangeInput,
  onBlurInput,
}: TagsInputProps) => {
  const [focused, setFocused] = useState(false);
  const { control, setValue, watch } = useFormContext();
  const tags = watch(name, []) as string[];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const newTag = event.currentTarget.value.trim();
      if (newTag && !tags.includes(newTag)) {
        setValue(name, [...tags, newTag]);
        event.currentTarget.value = "";
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      name,
      tags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error }, field: { value, onChange } }) => (
        <>
          <div
            className={`col-span-2 bg-gray-200 rounded-md relative border-2 ${
              !!error && "border-red-400"
            }`}
          >
            <label
              htmlFor={label.toLowerCase()}
              className={`absolute left-4 transition-label-form duration-100 ease-linear ${
                !!error ? "text-red-600" : "text-gray-600"
              } ${focused ? "top-1 text-xs" : "top-1/4 text-base"}`}
            >
              {label}
            </label>
            <input
              type="text"
              autoComplete="off"
              className="bg-transparent w-full pb-2 mt-5 px-4 appearance-none outline-none"
              name={label.toLowerCase()}
              id={label.toLowerCase()}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                setFocused(true);
                !!onChangeInput && onChangeInput();
              }}
              onBlur={(e) => {
                setFocused(false);
                !!onBlurInput && onBlurInput();
              }}
            />
          </div>
          <div className="col-span-2 flex gap-2">
            {tags.map((tag: string, index: number) => (
              <div
                key={index}
                className="bg-gray-200 py-1 px-3 flex items-center rounded-full"
              >
                {tag}
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-base ml-1 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    />
  );
};
