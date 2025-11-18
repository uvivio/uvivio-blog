import { cn } from "@/libs/utils";
import { generateColorFromText } from "@/utils/helpers";
import { Avatar as AntAvatar } from "antd";

interface AvatarProps {
  avatar_url?: string;
  name?: string;
  className?: string;
}

export const Avatar = ({ avatar_url, name, className }: AvatarProps) => {
  const background = avatar_url
    ? "#666666"
    : generateColorFromText(String(name));

  return (
    <div
      key={avatar_url}
      className={cn(
        "relative h-11 w-11 overflow-hidden rounded-full md:h-12 md:w-12",
        className
      )}
      style={{ background }}
    >
      <AntAvatar
        src={
          avatar_url ||
          `https://avatar.vercel.sh/${name}.svg?text=${name?.charAt(0)}`
        }
        className="h-full w-full !bg-transparent text-xl font-bold uppercase"
      >
        {name?.charAt(0)}
      </AntAvatar>
    </div>
  );
};
