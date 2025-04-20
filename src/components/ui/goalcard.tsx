"use client";
import { Checkbox } from "@/components/ui/checkbox";
import UnderlineInput from "./underlineInput";
import Image from "next/image";
import axios from "axios";
import { deleteToken, getToken } from "../../../utils/getAccesstoken";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";

export interface Goal {
  id?: string;
  name: string;
  streak: number;
  color: string;
  note?: string;
  status: boolean;
}

export default function GoalCard({
  goal,
  onChangeNote,
  onChangeComplete,
  setGoals,
}: {
  goal: Goal;
  onChangeNote?: (id: string, note: string) => void;
  onChangeComplete?: (id: string, status: boolean) => void;
  setGoals?: Dispatch<SetStateAction<Goal[]>>;
}) {
  const handleCheckboxChange = async (e: string | boolean) => {
    console.log(e);
    try {
      const token = await getToken("access_token");
      const updatedGoal = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/complete/${goal.id}`,
        {
          status: e ? true : false,
        },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      );
      if (onChangeComplete) {
        onChangeComplete(goal.id || "", e ? true : false);
      }
      if (setGoals) {
        console.log("streak", updatedGoal.data.streak);
        setGoals((prevGoals) =>
          prevGoals.map((g) =>
            g.id === goal.id ? { ...g, streak: updatedGoal.data.streak } : g
          )
        );
      }
      return updatedGoal;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        deleteToken("access_token");
        window.location.href = "/login";
        toast.error("Please login again");
      }
    }
  };
  return (
    <div
      className="w-full min-h-24 border rounded-xl flex items-center  justify-between"
      style={{ backgroundColor: `${goal.color}80` }} // 80 = ~50% opacity in hex
    >
      <div className="flex flex-col  pt-2 gap-2 h-full w-full   text-lg">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center  gap-4">
            <Checkbox
              checked={goal.status}
              onCheckedChange={(e) => handleCheckboxChange(e)}
              className="w-6 h-6 ml-3 bg-white"
            />
            <p>{goal.name}</p>
          </div>
          <div className="flex items-center mx-4">
            {goal.streak > 0 && (
              <p>
                {goal.streak} {goal.streak > 1 ? "days" : "day"} streak
              </p>
            )}
            {goal.streak > 0 ? (
              <Image
                src={"/streak.png"}
                alt="streak"
                width={50}
                height={50}
              ></Image>
            ) : (
              <Image
                src={"/non-streak.png"}
                alt="non-streak"
                width={50}
                height={50}
              ></Image>
            )}
          </div>
        </div>
        <div className="pl-14 w-full pr-14 pb-2">
          <UnderlineInput
            value={goal.note || ""}
            placeholder="note"
            className="w-full"
            onChange={(e) => {
              if (onChangeNote) {
                onChangeNote(goal.id || "", e.target.value);
              }
            }}
          />
        </div>
      </div>

      <div></div>
    </div>
  );
}
