import React from "react";

interface UnderlineInputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
}

const UnderlineInput: React.FC<UnderlineInputProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  disabled = false,
  onSubmit,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (onSubmit) {
            onSubmit();
          }
        }
      }}
      className={`w-full border-b-2 border-gray-300 focus:border-black focus:outline-none px-2  transition duration-200 ${className}`}
    />
  );
};

export default UnderlineInput;
