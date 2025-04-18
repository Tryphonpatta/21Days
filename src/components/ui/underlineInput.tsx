import React from "react";

interface UnderlineInputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

const UnderlineInput: React.FC<UnderlineInputProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border-b-2 border-gray-300 focus:border-black focus:outline-none px-2  transition duration-200 ${className}`}
    />
  );
};

export default UnderlineInput;
