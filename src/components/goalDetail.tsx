"use client";

import { useEffect, useState } from "react";
import { Goal, Tag } from "./ui/goalcard";
import axios, { isAxiosError } from "axios";
import { getToken } from "../../utils/getAccesstoken";
import { Button } from "./ui/button";
import Image from "next/image";
import { Infinity } from "ldrs/react";
import "ldrs/react/Infinity.css";
import UnderlineInput from "./ui/underlineInput";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";
import { colors } from "./newGoal";
import { X } from "lucide-react";

export default function GoalPage({ id }: { id: string }) {
  const [goal, setGoal] = useState<Goal | null>();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteTag = async (tagId: string) => {
    try {
      setLoading(true);
      const token = await getToken("access_token");
      if (!token) {
        toast.error("Please login again");
        return;
      }
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tag/${tagId}`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });
      setTags((prev) => prev.filter((tag) => tag.id !== tagId));
      if (goal?.tag && goal.tag.id === tagId) {
        setGoal((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            tag: null,
          };
        });
      }
      setLoading(false);
      toast.success("Tag deleted successfully");
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error) && error.response?.status == 401) {
        toast.error("Please login again");
        window.location.href = "/login";
        return;
      }
    }
  };

  const fetchGoalAndTag = async () => {
    setLoading(true);
    try {
      const token = await getToken("access_token");
      const goal = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/goal/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      );
      const tags = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/tags`,
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      );
      if (goal.status == 401 || tags.status == 401) {
        setLoading(false);
        toast.error("Please login again");

        return;
      }
      setTags(tags.data);
      setGoal({ ...goal.data, tags: goal.data.tag });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error) && error.response?.status == 401) {
        toast.error("Please login again");
        window.location.href = "/login";
        return;
      }
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = await getToken("access_token");
      if (!token) {
        toast.error("Please login again");
        return;
      }
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/goal/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });
      setLoading(false);
      window.location.href = "/main";
      toast.success("Goal deleted successfully");
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error) && error.response?.status == 401) {
        toast.error("Please login again");
        window.location.href = "/login";
        return;
      }
    }
  };

  useEffect(() => {
    fetchGoalAndTag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = await getToken("access_token");
      if (!token) {
        toast.error("Please login again");
        return;
      }
      const updatedGoal = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/goal/${id}`,
        {
          name: goal?.name,
          description: goal?.description,
          color: goal?.color,
          tag: goal?.tag ? goal.tag.id : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        }
      );
      setGoal(updatedGoal.data);
      setIsEdit(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error) && error.response?.status == 401) {
        toast.error("Please login again");
        window.location.href = "/login";
        return;
      }
    }
    setLoading(false);
    toast.success("Goal updated successfully");
  };

  return (
    <div>
      <div className="w-full mt-11 flex flex-col gap-4">
        <div className="flex justify-between items-center mx-7">
          <div className="text-3xl font-bold">
            {isEdit ? "Habit" : goal?.name}
          </div>
          <div>
            {isEdit ? (
              <Button
                onClick={() => {
                  handleDelete();
                }}
                className="cursor-pointer bg-red-400 hover:bg-red-600 "
              >
                delete
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsEdit(true);
                }}
                className="cursor-pointer"
              >
                edit
              </Button>
            )}
          </div>
        </div>
        {isEdit && (
          <div className="text-lg h-15 w-267 bg-[#F8F9FA] flex items-center mx-7 mt-1 rounded-lg">
            <UnderlineInput
              className="mx-3"
              value={goal?.name ? goal.name : ""}
              onChange={(e) => {
                setGoal((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    name: e.target.value,
                  };
                });
              }}
              placeholder="Add a name"
            ></UnderlineInput>
          </div>
        )}
        <div className="text-lg h-15 w-267 bg-[#F8F9FA] flex items-center mx-7 mt-1 rounded-lg">
          {isEdit ? (
            <UnderlineInput
              className="mx-3"
              value={goal?.description ? goal.description : ""}
              onChange={(e) => {
                setGoal((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    description: e.target.value,
                  };
                });
              }}
              placeholder="Add a description"
            ></UnderlineInput>
          ) : (
            <p className="mx-3">{goal?.description}</p>
          )}
        </div>
        {goal?.tag ? (
          <div className="text-lg h-15 w-fit  border-2  bg-[#F8F9FA] flex items-center mx-7 mt-2 rounded-lg border-[#1E1C1C]/40">
            <p className="mx-3">{goal?.tag.name}</p>
          </div>
        ) : (
          <div className="text-lg h-15 w-fit  border-2  bg-[#F8F9FA] flex items-center mx-7 mt-2 rounded-lg border-[#1E1C1C]/40 opacity-30">
            <p className="mx-3">{"Empty Tag"}</p>
          </div>
        )}
        {isEdit && (
          <div className="flex gap-2 mx-5">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="text-lg h-15 w-fit  border-2  bg-[#F8F9FA] flex items-center mx-2 mt-2 rounded-lg border-[#1E1C1C]/40 cursor-pointer hover:scale-105 duration-200 relative"
                onClick={() => {
                  setGoal((prev) => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      tag: tag,
                    };
                  });
                }}
              >
                <p className="mx-3">{tag.name}</p>
                <button
                  className="absolute top-0 right-0 mt-[-6px] mr-[-6px] bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent div's onClick
                    handleDeleteTag(tag.id as string);
                  }}
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
        )}
        {isEdit && (
          <div className="w-full mt-5">
            <div className="flex w-full justify-evenly px-20">
              {colors.map((color) => (
                <div
                  key={color}
                  className="w-10 h-10 rounded-full hover:scale-110 duration-200 cursor-pointer"
                  style={{
                    backgroundColor: color,
                    border: `2px solid ${
                      color == goal?.color ? "black" : "gray"
                    }`,
                  }}
                  onClick={() => {
                    setGoal((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        color: color,
                      };
                    });
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
        <div className="flex mx-7 gap-7 mt-3">
          <div className="w-80 h-50 rounded-4xl border-[#25282C]/30 border shadow-md">
            <div className="flex-col mt-6 mx-4 gap-4">
              <div className="flex justify-center items-center w-11 h-11 rounded-full bg-[#FFF2E5]">
                <Image
                  src={`/streak.png`}
                  alt="streak"
                  width={40}
                  height={40}
                ></Image>
              </div>
              <div className="mt-10 mx-3">
                <p className=" text-[#001733] font-medium opacity-50">
                  Current Streaks
                </p>
              </div>
              <p className="font-bold text-3xl mx-3">
                {goal?.streak ? goal?.streak : 0}
              </p>
            </div>
          </div>
          <div className="w-80 h-50 rounded-4xl border-[#25282C]/30 border shadow-md">
            <div className="flex-col mt-6 mx-4 gap-4">
              <div className="flex justify-center items-center w-11 h-11 rounded-full bg-[#FFF2E5]">
                <Image
                  src={`/best_streak.png`}
                  alt="best_streak"
                  width={40}
                  height={40}
                ></Image>
              </div>
              <div className="mt-10 mx-3">
                <p className=" text-[#001733] font-medium opacity-50">
                  Best Streaks
                </p>
              </div>
              <p className="font-bold text-3xl mx-3">
                {goal?.bestStreak ? goal?.bestStreak : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isEdit && (
        <Button
          variant="outline"
          size="lg"
          className="fixed bottom-5 right-5 z-50 shadow-lg hover:scale-125 duration-200 cursor-pointer bg-black text-white"
          onClick={() => {
            handleUpdate();
          }}
        >
          <TiTick />
        </Button>
      )}
      {loading && (
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
