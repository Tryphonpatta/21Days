"use client";

import GoalCard, { Goal } from "@/components/ui/goalcard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import NewGoal from "@/components/newGoal";
import axios from "axios";
import { deleteToken, getToken } from "../../../utils/getAccesstoken";
import { toast } from "react-toastify";

export default function MainPage() {
  const [isNew, setIsNew] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const token = await getToken("access_token");
      const goals = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/goal`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });
      // console.log(goals);
      setGoals(goals.data);
    } catch (error) {
      // console.log(error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        deleteToken("access_token");
        window.location.href = "/login";
        toast.error("Please login again");
      }
    }
    // setGoals()
  };

  const onChangeNote = (id: string, note: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === id ? { ...goal, note: note } : goal))
    );
  };

  const onChangeComplete = (id: string, status: boolean) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, status: status } : goal
      )
    );
  };

  return (
    <div className="w-full  px-5">
      {!isNew ? (
        <>
          <div className="font-bold text-3xl pl-4 pt-5">Habit</div>
          <div className="mt-5 flex flex-col items-center w-full gap-2">
            {goals.map((goal) => (
              <div key={goal.id} className="w-[95%]">
                <GoalCard
                  goal={goal}
                  onChangeNote={onChangeNote}
                  onChangeComplete={onChangeComplete}
                  setGoals={setGoals}
                ></GoalCard>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-5 right-5 z-50 shadow-lg"
            onClick={() => {
              setIsNew(!isNew);
            }}
          >
            <PlusIcon />
          </Button>
        </>
      ) : (
        <>
          <div className="font-bold text-3xl pl-4 pt-5">Create New Habit</div>
          <NewGoal setIsNew={setIsNew} setGoals={setGoals}></NewGoal>
        </>
      )}
    </div>
  );
}
