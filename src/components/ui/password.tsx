import { Dispatch, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PasswordInput({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  placeholder: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-106 h-16 rounded-lg mt-1 text-[15px] border ">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full pr-10 border-none bg-transparent outline-none "
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-1/2 right-3 -translate-y-1/2 outline-none"
        tabIndex={-1}
      >
        {show ? (
          <EyeOff className="w-5 h-5 hover:scale-125 duration-200 cursor-pointer" />
        ) : (
          <Eye className="w-5 h-5 hover:scale-125 duration-200 cursor-pointer" />
        )}
      </button>
    </div>
  );
}
