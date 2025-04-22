"use client";
import Image from "next/image";
// import { useState } from "react";

export default function badge() {
  //   const [badge, setBadge] = useState(null);
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
  return (
    <div className="mx-5 mt-9">
      <p className="text-3xl font-bold mb-6">Badge</p>
      <div className="flex flex-col gap-3 mx-5">
        <div className="flex w-256 gap-3">
          <BadgeCard
            unlocked
            badgeName="7-day streak"
            badgeImg="/badge/7_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked
            badgeName="15-day streak"
            badgeImg="/badge/15_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked
            badgeName="30-day streak"
            badgeImg="/badge/30_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked
            badgeName="60-day streak"
            badgeImg="/badge/60_day.png"
          ></BadgeCard>
        </div>
        <div className="flex w-256 gap-3">
          <BadgeCard
            unlocked
            badgeName="100-day streak"
            badgeImg="/badge/100_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked
            badgeName="300-day streak"
            badgeImg="/badge/300_day.png"
          ></BadgeCard>
          <BadgeCard
            unlocked
            badgeName="1k check-ins"
            badgeImg="/badge/1k_check.png"
          ></BadgeCard>
          <BadgeCard
            unlocked={false}
            badgeName="5k check-ins"
            badgeImg="/badge/5k_check.png"
          ></BadgeCard>
        </div>
      </div>
    </div>
  );
}
