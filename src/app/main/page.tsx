"use client";

import GoalCard, { Goal } from "@/components/ui/goalcard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronRight, PlusCircle, PlusIcon } from "lucide-react";
import NewGoal from "@/components/newGoal";

export default function MainPage() {
  const [isNew, setIsNew] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "🏋️Exercise",
      streak: 3,
      color: "#FFEE93",
      note: "",
    },
    {
      id: "2",
      name: "📚Study",
      streak: 5,
      color: "#0038FF",
      note: "",
    },
    {
      id: "3",
      name: "🍽️Eat Healthy",
      streak: 0,
      color: "#FF5C93",
      note: "",
    },
  ]);

  const onChangeNote = (id: string, note: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === id ? { ...goal, note: note } : goal))
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
                <GoalCard goal={goal} onChangeNote={onChangeNote}></GoalCard>
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
