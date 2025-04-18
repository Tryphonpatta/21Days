import { RiNotification3Fill } from "react-icons/ri";

export default function Header() {
  return (
    <div className="flex justify-end items-center w-full h-16 px-5 bg-white border-b gap-4 pr-10 ">
      <div>Statistics</div>
      <div>Leaderboard</div>
      <RiNotification3Fill size={24} />
    </div>
  );
}
