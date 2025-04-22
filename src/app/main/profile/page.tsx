"use client";
import axios from "axios";
import Image from "next/image";
import "ldrs/react/Infinity.css";

import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import { getToken } from "../../../../utils/getAccesstoken";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  LogOut,
  LucideProps,
  Settings,
  User2Icon,
} from "lucide-react";
import { Infinity } from "ldrs/react";

type Profile = {
  username: string;
  email: string;
  img: string;
};

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>();

  const SelectionCard = ({
    topic,
    href,
    Logo,
  }: {
    topic: string;
    href: string;
    Logo?: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }) => {
    return topic === "Log Out" ? (
      <div className="w-250 h-13 flex items-center hover:bg-[#F9FAFB] duration-200 mx-15 px-3 cursor-pointer">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-3">
            {Logo && <Logo className="w-8 h-8 text-gray-600 mr-3" />}
            <p className=" text-lg">{topic}</p>
          </div>
          <div>
            <ChevronRight />
          </div>
        </div>
      </div>
    ) : (
      <a href={href}>
        <div className="w-250 h-13 flex items-center hover:bg-[#F9FAFB] duration-200 mx-15 px-3">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-3">
              {Logo && <Logo className="w-8 h-8 text-gray-600 mr-3" />}
              <p className=" text-lg">{topic}</p>
            </div>
            <div>
              <ChevronRight />
            </div>
          </div>
        </div>
      </a>
    );
  };
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/login";
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const token = await getToken("access_token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      );
      setProfile(res.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="mx-5 mt-9">
      <p className="text-3xl font-bold mb-6">Profile</p>
      <div className="flex items-center mx-15 mt-10 mb-5">
        <Image
          src="/profile.png"
          alt="Profile"
          className="w-30 h-30 rounded-full mr-4"
          width={120}
          height={120}
        />
        <div>
          <h1 className="text-3xl font-bold">{profile?.username}</h1>
          <p className="text-gray-500">{profile?.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-0">
        <SelectionCard
          topic={"My Profile"}
          href="/"
          Logo={User2Icon}
        ></SelectionCard>
        <SelectionCard
          topic={"Setting"}
          href="/"
          Logo={Settings}
        ></SelectionCard>
        <SelectionCard
          topic={"Badges"}
          href="/badge"
          Logo={BadgeCheck}
        ></SelectionCard>
        <SelectionCard
          topic={"Notification"}
          href="/"
          Logo={Bell}
        ></SelectionCard>
        <div onClick={handleLogout}>
          <SelectionCard
            topic={"Log Out"}
            href="/"
            Logo={LogOut}
          ></SelectionCard>
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
