import { Checkbox } from "@/components/ui/checkbox";
import UnderlineInput from "./underlineInput";
import Image from "next/image";

export interface Goal {
  id?: string;
  name: string;
  streak: number;
  color: string;
  note?: string;
}

export default function GoalCard({
  goal,
  onChangeNote,
}: {
  goal: Goal;
  onChangeNote?: (id: string, note: string) => void;
}) {
  return (
    <div
      className="w-full min-h-24 border rounded-xl flex items-center  justify-between"
      style={{ backgroundColor: `${goal.color}80` }} // 80 = ~50% opacity in hex
    >
      <div className="flex flex-col  pt-2 gap-2 h-full w-full   text-lg">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center  gap-4">
            <Checkbox className="w-6 h-6 ml-3 bg-white" />
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
