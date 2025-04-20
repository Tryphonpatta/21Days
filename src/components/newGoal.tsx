"use client";

import { useState } from "react";
import UnderlineInput from "./ui/underlineInput";
import { Button } from "./ui/button";
import { TiTick } from "react-icons/ti";
import { X } from "lucide-react";
import { Goal } from "./ui/goalcard";
import { toast } from "react-toastify";
import axios from "axios";
import { getToken } from "../../utils/getAccesstoken";
const colors = [
  "#ADF7B6",
  "#A817C0",
  "#FFC09F",
  "#B0FFFA",
  "#FCFF52",
  "#4EFF31",
  "#5BFFD8",
  "#0038FF",
  "#622BFF",
  "#D21DFF",
  "#B92350",
  "#FF0000",
  "#E9E3E8",
  "#554E55",
];

export default function NewGoal({
  setIsNew,
  setGoals,
}: {
  setIsNew: (isNew: boolean) => void;
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}) {
  const [goalName, setGoalName] = useState("");
  const [goalNote, setGoalNote] = useState("");
  const [goalColor, setGoalColor] = useState("#FFC09F");
  const [goalTag, setGoalTag] = useState("");
  const [tag, setTag] = useState<string[]>(["test", "test2"]);
  const [isAddMore, setIsAddMore] = useState(false);
  const [addingTag, setAddingTag] = useState("");

  const handleAddGoal = async () => {
    const token = await getToken("access_token");
    if (!token) {
      toast.error("Please login again");
      return;
    }

    if (goalName.trim() === "") {
      toast.error("Please enter a goal name");
      return;
    }
    const newGoal = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/goal`,
      {
        name: goalName,
        color: goalColor,
        note: goalNote,
        tags: goalTag,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    console.log(newGoal);
    if (newGoal.status !== 200 && newGoal.status !== 201) {
      toast.error("Failed to add goal");
      return;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center">
      <div className="w-[95%] gap-4 flex flex-col items-center mt-7">
        <div className="h-15 bg-[#F8F9FA] w-full rounded-xl flex items-center justify-between px-4">
          <UnderlineInput
            value={goalName}
            placeholder="Goal's Name"
            onChange={(e) => setGoalName(e.target.value)}
            className=" bg-[#F8F9FA]"
          ></UnderlineInput>
        </div>
        <div className="h-15 bg-[#F8F9FA] w-full rounded-xl flex items-center justify-between px-4">
          <UnderlineInput
            value={goalNote}
            placeholder="Goal's Note"
            onChange={(e) => setGoalNote(e.target.value)}
          ></UnderlineInput>
        </div>
        <div className="h-25 bg-[#F8F9FA] w-full py-4  rounded-xl flex-col items-center justify-between px-4">
          <UnderlineInput
            value={goalTag}
            placeholder="Set a tag for your task"
            onChange={(e) => setGoalColor(e.target.value)}
            disabled={true}
          ></UnderlineInput>
          <div className="flex gap-4 mx-2 mt-3">
            {tag.map((t) => (
              <div key={t}>
                <div
                  className="h-9 bg-[#F8F9FA] border rounded-3xl p-3 flex items-center justify-between hover:scale-110 duration-200 cursor-pointer"
                  onClick={() => {
                    setGoalTag(t);
                  }}
                >
                  {t}
                </div>
              </div>
            ))}
            {!isAddMore ? (
              <div
                className="h-9 bg-[#F8F9FA] border rounded-3xl p-3 flex items-center justify-between hover:scale-110 duration-200 cursor-pointer"
                onClick={() => setIsAddMore(!isAddMore)}
              >
                Add more +
              </div>
            ) : (
              <div className="h-9 bg-[#F8F9FA] border rounded-3xl p-3 flex items-center justify-between hover:scale-110 duration-200 cursor-pointer">
                <UnderlineInput
                  value={addingTag}
                  onChange={(e) => {
                    setAddingTag(e.target.value);
                  }}
                  placeholder="Add a tag"
                  onSubmit={() => {
                    if (addingTag.trim() != "")
                      setTag((prev) => [...prev, addingTag]);
                    setAddingTag("");
                    setIsAddMore(false);
                  }}
                ></UnderlineInput>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-5">
          <p className="font-bold">Card Color</p>
          <div className="flex w-full justify-evenly px-20">
            {colors.map((color) => (
              <div
                key={color}
                className="w-10 h-10 rounded-full hover:scale-110 duration-200 cursor-pointer"
                style={{
                  backgroundColor: color,
                  border: `2px solid ${color == goalColor ? "black" : "gray"}`,
                }}
                onClick={() => setGoalColor(color)}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-5 right-5 z-50 shadow-lg hover:scale-125 duration-200 cursor-pointer"
        onClick={() => {
          handleAddGoal();
          setGoals((prev: Goal[]) => [
            ...prev,
            {
              id: Math.random().toString(),
              name: goalName,
              streak: 0,
              color: goalColor,
              note: goalNote,
            } as Goal,
          ]);
          setIsNew(false);
          setGoalName("");
          setGoalNote("");
          setGoalColor("#FFC09F");
          setGoalTag("");
          setAddingTag("");
        }}
      >
        <TiTick />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-5 right-17 z-50 shadow-lg cursor-pointer hover:scale-125 duration-200"
        onClick={() => {
          setIsNew(false);
        }}
      >
        <X />
      </Button>
    </div>
  );
}
