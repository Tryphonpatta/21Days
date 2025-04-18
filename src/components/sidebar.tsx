"use client";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-80 h-screen items-center border gap-2">
      <div className="flex justify-center items-center gap-2 mt-4">
        <Image src={"logo.svg"} alt="logo" width={60} height={60}></Image>
        <div className="text-3xl font-bold">21 Days</div>
      </div>
      <div className="my-3">
        <Calendar
          mode="single"
          selected={new Date()}
          className=" rounded-2xl border shadow"
        />
      </div>
      <div className="w-full mt-4">
        <div className="font-bold px-3">Habit</div>
        <div className=" mt-2 text-xl ">
          <div className="flex justify-between h-15 items-center hover:bg-gray-100 cursor-pointer w-full duration-200">
            <p className="px-5">All</p>
            <p className="px-5">4</p>
          </div>
          <div className="flex justify-between h-15 items-center hover:bg-gray-100 cursor-pointer w-full duration-200">
            <p className="px-5">Daily Routine</p>
            <p className="px-5">0</p>
          </div>
          <div className="flex justify-between h-15 items-center hover:bg-gray-100 cursor-pointer w-full duration-200">
            <p className="px-5">Study Routine</p>
            <p className="px-5">4</p>
          </div>
        </div>
      </div>
      {/* <div className="w-full">
        <div className="font-bold px-3">Lists</div>
        <div className="mt-2 text-xl ">
          <div className="flex justify-between h-15 items-center hover:bg-gray-100 cursor-pointer w-full duration-200">
            <p className="px-5">Daily Routine</p>
            <p className="px-5">0</p>
          </div>
          <div className="flex justify-between h-15 items-center hover:bg-gray-100 cursor-pointer w-full duration-200">
            <p className="px-5">Study Routine</p>
            <p className="px-5">4</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
