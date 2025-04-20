"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSignUp = async () => {
    if (username === "" || password === "" || email === "") {
      toast.error("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        username: username,
        password: password,
        email: email,
      }
    );
    if (res.status !== 200) {
      toast.error("Sign up failed");
      return;
    }
    toast.success("Sign up successful");
  };
  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Background image */}
      <Image
        className=" z-0 mt-40 "
        src="/image.png"
        alt="bg"
        fill
        style={{ objectFit: "cover" }}
      />

      {/* Content layer */}
      <div className="relative z-30">
        {/* Header */}
        <div className="border-2 flex w-full items-center justify-between h-17   ">
          <div className="flex items-center mx-3">
            <Image
              src="/logo.svg"
              alt="logo"
              width={60}
              height={60}
              className="w-15 h-15 m-5"
            />
            <div className="text-3xl font-bold">21 Days</div>
          </div>
          <div className="flex w-100 justify-evenly mx-4">
            <div>About us</div>
            <div>Contacts</div>
          </div>
        </div>

        {/* Login Box */}
        <div className="flex justify-center w-full pt-25 h-full ">
          <div className="w-207 h-162 border rounded-[3.5rem] flex flex-col py-20 items-center gap-5 shadow-xl bg-white/80">
            <div className="font-bold text-[22px] text-[#C67ED2]">
              Log in to HabitGoal
            </div>
            <div>Welcome back! Sign up to continue us</div>
            <div className="w-106 h-16 rounded-2xl mt-10 text-[15px]">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full h-full"
              />
            </div>
            <div className="w-106 h-16 rounded-2xl mt-1 text-[15px]">
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-full"
              />
            </div>
            <div className="w-106 h-16 rounded-2xl mt-1 text-[15px]">
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-full"
              />
            </div>
            <p className="mt-10 text-[12px] underline cursor-pointer hover:text-gray-400 duration-200">
              {` don't have an account yet ? sign up now`}
            </p>
            <div>
              <Button
                className="mt-2 w-58 h-16 rounded-2xl text-[25px] bg-white text-black shadow-xl hover:bg-gray-200 duration-500 cursor-pointer"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
