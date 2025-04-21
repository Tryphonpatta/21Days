"use client";

import { useEffect, useState } from "react";
import UnderlineInput from "./ui/underlineInput";
import { Button } from "./ui/button";
import { TiTick } from "react-icons/ti";
import { X } from "lucide-react";
import { Goal, Tag } from "./ui/goalcard";
import { toast } from "react-toastify";
import axios from "axios";
import { deleteToken, getToken } from "../../utils/getAccesstoken";
import "ldrs/react/Infinity.css";
import { Infinity } from "ldrs/react";
import { useRouter } from "next/navigation";
export const colors = [
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
  const router = useRouter();
  const [goalName, setGoalName] = useState("");
  const [goalNote, setGoalNote] = useState("");
  const [goalColor, setGoalColor] = useState("#FFC09F");
  const [goalTag, setGoalTag] = useState<Tag | null>();
  const [tag, setTag] = useState<Tag[]>([]);
  const [isAddMore, setIsAddMore] = useState(false);
  const [addingTag, setAddingTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTags = async () => {
    setIsLoading(true);
    const token = await getToken("access_token");
    if (!token) {
      toast.error("Please login again");
      return;
    }
    const tags = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/tags`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    if (tags.status !== 200 && tags.status !== 201) {
      toast.error("Failed to fetch tags");
      return;
    }
    setTag(tags.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTags();
  }, []);
  const onSubmitTag = async () => {
    setIsLoading(true);
    if (addingTag.trim() != "") {
      const token = await getToken("access_token");
      if (!token) {
        toast.error("Please login again");
        return;
      }
      const newTag = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tag`,
        {
          name: addingTag,
        },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      );
      if (newTag.status !== 200 && newTag.status !== 201) {
        toast.error("Failed to add tag");
        return;
      }
      const responseTag = {
        id: newTag.data.id,
        name: newTag.data.name,
      } as Tag;
      setAddingTag("");
      setIsAddMore(false);
      setTag((prev) => {
        const newTags = [...prev, responseTag];
        return newTags;
      });
    }
    setAddingTag("");
    setIsAddMore(false);
    setIsLoading(false);
    router.refresh();
  };
  const handleDeleteTag = async (id: string) => {
    try {
      setIsLoading(true);
      const token = await getToken("access_token");
      if (!token) {
        toast.error("Please login again");
        return;
      }
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tag/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });
      setIsLoading(false);
      setTag((prev) => {
        const newTags = prev.filter((t) => t.id !== id);
        return newTags;
      });
      if (goalTag?.id === id) {
        setGoalTag(null);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        deleteToken("access_token");
        window.location.href = "/login";
        toast.error("Please login again");
      }
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };
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
        tag: goalTag?.id ? goalTag.id : null,
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
    const responseGoal = {
      id: newGoal.data.id,
      name: newGoal.data.name,
      streak: 0,
      color: newGoal.data.color,
      description: newGoal.data.note,
      tag: goalTag?.id ? goalTag : null,
    } as Goal;
    setGoals((prev: Goal[]) => [...prev, responseGoal]);
    setIsNew(false);
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
            value={goalTag?.name ? goalTag.name : ""}
            placeholder="Set a tag for your task"
            onChange={(e) => setGoalColor(e.target.value)}
            disabled={true}
          ></UnderlineInput>
          <div className="flex gap-4 mx-2 mt-3">
            {tag.map((t) => (
              <div key={t.id} className="relative mt-1">
                <div
                  className="h-9 bg-[#F8F9FA] border rounded-3xl p-3 flex items-center justify-between hover:bg-accent duration-200 cursor-pointer"
                  onClick={() => {
                    setGoalTag(t);
                  }}
                >
                  <p>{t.name}</p>
                </div>
                <button
                  className="absolute top-0 right-0 mt-[-6px] mr-[-6px] bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent div's onClick
                    handleDeleteTag(t.id as string);
                  }}
                >
                  <X />
                </button>
              </div>
            ))}
            {!isAddMore ? (
              <div
                className="h-9 bg-[#F8F9FA] border rounded-3xl p-3 flex mt-1 items-center justify-between hover:scale-110 duration-200 cursor-pointer"
                onClick={() => setIsAddMore(!isAddMore)}
              >
                Add more +
              </div>
            ) : (
              <div className="h-9 bg-[#F8F9FA] border rounded-3xl p-3 mt-1 flex items-center justify-between cursor-pointer">
                <UnderlineInput
                  value={addingTag}
                  onChange={(e) => {
                    setAddingTag(e.target.value);
                  }}
                  placeholder="Add a tag"
                  onSubmit={() => {
                    onSubmitTag();
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
          setIsNew(false);
          setGoalName("");
          setGoalNote("");
          setGoalColor("#FFC09F");
          setGoalTag(null);
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
