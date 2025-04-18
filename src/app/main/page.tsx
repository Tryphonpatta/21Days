"use client";

import GoalCard, { Goal } from "@/components/ui/goalcard";
import { useState } from "react";

export default function MainPage() {
  const [isNew, setIsNew] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "🏋️Exercise",
      streak: 3,
      color: "#FFEE93",
    },
    {
      id: "2",
      name: "📚Study",
      streak: 5,
      color: "#0038FF",
    },
    {
      id: "3",
      name: "🍽️Eat Healthy",
      streak: 0,
      color: "#FF5C93",
    },
  ]);

  const onChangeNote = (id: string, note: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === id ? { ...goal, note: note } : goal))
    );
  };

  return (
    <div className="w-full  px-5">
      <div className="font-bold text-3xl pl-4 pt-5">Today</div>
      <div className="mt-5 flex flex-col items-center w-full gap-2">
        {goals.map((goal) => (
          <div key={goal.id} className="w-[95%]">
            <GoalCard goal={goal}></GoalCard>
          </div>
        ))}
      </div>
    </div>
  );
}
