"use client";

import { User } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../../utils/getAccesstoken";
import { Infinity } from "ldrs/react";
import "ldrs/react/Infinity.css";

type LeaderboardData = {
  rank: number;
  name: string;
  email: string;
  streak: number;
  bestStreak: number;
  completed: number;
  isUser: boolean;
};

export default function LeaderboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const processLeaderboard = (leaderboard: LeaderboardData[]) => {
    const processedLeaderboard = leaderboard.sort((a, b) => {
      if (a.streak > b.streak) return -1;
      if (a.streak < b.streak) return 1;
      return 0;
    });
    console.log(processedLeaderboard);
    return processedLeaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
  };

  const fetchLeaderboardData = async () => {
    try {
      const token = await getToken("access_token");
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/leaderboard`,
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      );
      setLeaderboardData(processLeaderboard(res.data));
      setIsLoading(false);
      //   setLeaderboardData(res.data);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-3 mt-9">
      <p className="text-3xl font-bold mb-6">Leaderboard</p>

      <div className="grid grid-cols-[50px_0.8fr_150px_150px_150px] text-sm font-medium px-4 py-2">
        <div></div>
        <div></div>
        <div className="flex items-center gap-1 justify-center w-full">
          <div className="flex flex-col items-center">
            <Image
              src={"/streak.png"}
              alt="streak"
              width={50}
              height={50}
            ></Image>
            Current Streak
          </div>
        </div>
        <div className="flex items-center gap-1 justify-center w-full">
          <div className="flex flex-col items-center">
            <Image
              src={"/best_streak.png"}
              alt="best_streak"
              width={45}
              height={45}
            ></Image>
            Best Streak
          </div>
        </div>
        <div className="flex items-center gap-1 justify-center w-full">
          <div className="flex flex-col items-center">
            <Image
              src={"/complete.png"}
              alt="complete"
              width={45}
              height={45}
            ></Image>
            Complete Streak
          </div>
        </div>
      </div>

      {leaderboardData.map((user, i) => (
        <div
          key={user.rank}
          className={clsx(
            "grid grid-cols-[50px_0.8fr_150px_150px_150px] items-center px-4 py-2 rounded-md",
            user.isUser
              ? "bg-blue-200 text-blue-900 font-semibold"
              : i % 2 === 0
              ? "bg-[#F7FAFC]"
              : "bg-[#EDF2F7]"
          )}
        >
          <div>{user.rank}</div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-500" />
            {user.name}
          </div>
          <div className="w-full flex justify-center">{user.streak}</div>
          <div className="w-full flex justify-center">{user.bestStreak}</div>

          <div className="w-full flex justify-center">{user.completed}</div>
        </div>
      ))}
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
