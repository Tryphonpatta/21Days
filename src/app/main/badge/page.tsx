"use client";
import axios from "axios";
import Image from "next/image";
import { getToken } from "../../../../utils/getAccesstoken";
import { useEffect, useState } from "react";
import { Infinity } from "ldrs/react";
import "ldrs/react/Infinity.css";

// import { useState } from "react";
type BadgeStatus = {
  "7_day": boolean;
  "15_day": boolean;
  "30_day": boolean;
  "60_day": boolean;
  "100_day": boolean;
  "300_day": boolean;
  "1k_Check": boolean;
  "3k_Check": boolean;
};
export default function Badge() {
  const [badge, setBadge] = useState<BadgeStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const BadgeCard = ({
    unlocked = false,
    badgeName = "Badge Name",
    badgeImg,
  }: {
    unlocked?: boolean;
    badgeName?: string;
    badgeImg?: string;
  }) => {
    return unlocked ? (
      <div className="w-60 h-75 rounded-3xl bg-[#DDDDDD] flex flex-col items-center">
        <Image
          src={badgeImg as string}
          alt={badgeName}
          width={150}
          height={150}
          className="mt-6"
        ></Image>
        <div className="w-full flex flex-col px-8 mt-8 opacity-75">
          {unlocked ? <p>unlocked</p> : <p>locked</p>}
        </div>
        <div className="w-full flex flex-col px-8  mt-2">
          <p className=" text-xl font-bold">{badgeName}</p>
        </div>
      </div>
    ) : (
      <div className="w-60 h-75 rounded-3xl bg-[#DDDDDD] flex flex-col items-center opacity-40">
        <Image
          src={badgeImg as string}
          alt={badgeName}
          width={150}
          height={150}
          className="mt-6"
        ></Image>
        <div className="w-full flex flex-col px-8 mt-8 opacity-75">
          {unlocked ? <p>unlocked</p> : <p>locked</p>}
        </div>
        <div className="w-full flex flex-col px-8  mt-2">
          <p className=" text-xl font-bold">{badgeName}</p>
        </div>
      </div>
    );
  };
  const fetchBadges = async () => {
    setIsLoading(true);
    const token = await getToken("access_token");
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/badges`, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    setBadge(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchBadges();
  }, []);
  return (
    <div className="mx-5 mt-9">
      <p className="text-3xl font-bold mb-6">Badge</p>
      <div className="flex flex-col gap-3 mx-5">
        <div className="flex w-256 gap-3">
          <BadgeCard
            unlocked={badge?.["7_day"]}
            badgeName="7-day streak"
            badgeImg="/badge/7_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked={badge?.["15_day"]}
            badgeName="15-day streak"
            badgeImg="/badge/15_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked={badge?.["30_day"]}
            badgeName="30-day streak"
            badgeImg="/badge/30_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked={badge?.["60_day"]}
            badgeName="60-day streak"
            badgeImg="/badge/60_day.png"
          ></BadgeCard>
        </div>
        <div className="flex w-256 gap-3">
          <BadgeCard
            unlocked={badge?.["100_day"]}
            badgeName="100-day streak"
            badgeImg="/badge/100_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked={badge?.["300_day"]}
            badgeName="300-day streak"
            badgeImg="/badge/300_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked={badge?.["1k_Check"]}
            badgeName="1k check-ins"
            badgeImg="/badge/1k_check.png"
          ></BadgeCard>
          <BadgeCard
            unlocked={badge?.["3k_Check"]}
            badgeName="5k check-ins"
            badgeImg="/badge/5k_check.png"
          ></BadgeCard>
        </div>
      </div>
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
