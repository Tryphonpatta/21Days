"use client";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Tag } from "./ui/goalcard";
import { getToken } from "../../utils/getAccesstoken";
import axios from "axios";
import { Infinity } from "ldrs/react";
import "ldrs/react/Infinity.css";

type TagCount = Tag & { count: number; goalCount: number };

export default function Sidebar() {
  const [tags, setTags] = useState<TagCount[]>([]);
  const [goalCount, setGoalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fetchGoalCount = async () => {
    try {
      const token = await getToken("access_token");
      const goal = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/goal`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });
      setGoalCount(goal.data.length);
    } catch (error) {
      console.error("Error fetching goal count:", error);
    }
  };
  const fetchTags = async () => {
    try {
      setIsLoading(true);
      const token = await getToken("access_token");
      if (!token) {
        return;
      }
      const tagsRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/tags`,
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      );
      setTags(tagsRes.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching tags:", error);
    }
  };
  useEffect(() => {
    fetchTags();
    fetchGoalCount();
  }, []);

  return (
    <div className="flex flex-col w-80 h-screen items-center border gap-2">
      <div
        className="flex justify-center items-center gap-2 mt-4 hover:scale-105 duration-200 cursor-pointer"
        onClick={() => (window.location.href = "/main")}
      >
        <Image src={"/logo.svg"} alt="logo" width={60} height={60}></Image>
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
          <div
            className="flex justify-between h-15 items-center hover:bg-gray-100 cursor-pointer w-full duration-200"
            onClick={() => (window.location.href = "/main")}
          >
            <p className="px-5">All</p>
            <p className="px-5">{goalCount ? goalCount : 0}</p>
          </div>
          {/* <div className="flex justify-between h-15 items-center hover:bg-gray-100 cursor-pointer w-full duration-200">
            <p className="px-5">Daily Routine</p>
            <p className="px-5">0</p>
          </div>
          <div className="flex justify-between h-15 items-center hover:bg-gray-100 cursor-pointer w-full duration-200">
            <p className="px-5">Study Routine</p>
            <p className="px-5">4</p>
          </div> */}
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex justify-between h-15 items-center hover:bg-gray-100 cursor-pointer w-full duration-200"
              onClick={() => (window.location.href = `/main/tag/${tag.id}`)}
            >
              <p className="px-5">{tag.name}</p>
              <p className="px-5">{tag.count}</p>
            </div>
          ))}
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
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center h-screen backdrop-blur-sm bg-white/30 z-50">
          <Infinity
            size="55"
            stroke="4"
            strokeLength="0.15"
            bgOpacity="0.1"
            speed="1.3"
            color="black"
          />
        </div>
      )}
    </div>
  );
}
