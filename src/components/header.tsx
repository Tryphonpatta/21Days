import { RiNotification3Fill } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  return (
    <div className="flex justify-end items-center w-full h-16 px-5 bg-white border-b gap-4 pr-10 ">
      <div>
        <a href="/main/stats">Statistics</a>
      </div>
      <div>
        <a href="/main/leaderboard">Leaderboard</a>
      </div>
      <RiNotification3Fill size={24} />
      <a href="/main/profile">
        <Avatar>
          <AvatarImage src="/profile.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </a>
    </div>
  );
}
