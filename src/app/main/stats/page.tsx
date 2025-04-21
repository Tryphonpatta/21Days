"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toZonedTime } from "date-fns-tz";
import { subDays, isSameDay } from "date-fns";
import { getToken } from "../../../../utils/getAccesstoken";

export type GoalLog = {
  id: string;
  goalId: string;
  day: Date;
};
export type Stats = {
  goals: {
    id: string;
    name: string;
    color: string;
    goalLog: GoalLog[];
  }[];
  streak: number;
  bestStreak: number;
  completed: number;
};

export default function StatsPage() {
  const heatmapComp = (goalLogs: GoalLog[], color: string) => {
    const timeZone = "Asia/Bangkok";
    const today = toZonedTime(new Date(), timeZone);
    const logsInLocalTime = goalLogs.map((log) =>
      toZonedTime(new Date(log.day), timeZone)
    );
    const heatmap: boolean[] = Array(30).fill(false);

    for (let i = 0; i < 30; i++) {
      const date = subDays(today, 29 - i);
      const found = logsInLocalTime.some((logDate) => isSameDay(logDate, date));
      heatmap[i] = found;
    }
    console.log(heatmap);
    return (
      <div className="flex gap-1">
        {heatmap.map((filled, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              filled ? `bg-${color}` : "bg-gray-200"
            }`}
            style={{
              backgroundColor: filled ? color : "#E5E7EB",
            }}
          ></div>
        ))}
      </div>
    );
  };

  const fetchStats = async () => {
    try {
      const token = await getToken("access_token");
      if (!token) {
        return;
      }
      const statsRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/stats`,
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      );
      console.log(statsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  const Card = ({
    imgUrl,
    title,
    value,
  }: {
    imgUrl: string;
    title: string;
    value: string;
  }) => {
    return (
      <div className="w-64 h-50 rounded-4xl border-[#25282C]/30 border shadow-md">
        <div className="flex-col mt-6 mx-4 gap-4">
          <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[#FFF2E5]">
            <Image src={imgUrl} alt="streak" width={40} height={40}></Image>
          </div>
          <div className="mt-10 mx-3">
            <p className=" text-[#001733] font-medium opacity-50">{title}</p>
          </div>
          <p className="font-bold text-3xl mx-3">{value}</p>
        </div>
      </div>
    );
  };
  const [stats, setStats] = useState<Stats>();

  return (
    <div className="w-full mt-11 flex flex-col gap-4 items-center">
      <div className="flex justify-between items-center w-full px-7 mx-7">
        <div className="text-3xl font-bold">Statistics</div>
      </div>
      <div className="flex w-full justify-evenly px-10">
        <Card imgUrl="/streak.png" title="Current Streak" value="130"></Card>
        <Card imgUrl="/best_streak.png" title="Best Streak" value="192"></Card>
        <Card imgUrl="/complete.png" title="Completion Rate" value="75%"></Card>
        <Card imgUrl="/habit.png" title="Habits Completed" value="3"></Card>
      </div>
      <div className="mt-4 mx-3 w-254 h-fit py-8 border rounded-3xl">
        <p className="px-5 text-3xl mx-3 mb-5">Streak</p>
        <div className="space-y-4 mx-8">
          {stats?.goals.map((goal) => (
            <div
              key={goal.id}
              className="grid grid-cols-[300px_1fr] items-center gap-4"
            >
              <p className="font-medium">{goal.name}</p>
              <div className="flex gap-1">
                {heatmapComp(goal.goalLog, goal.color)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
