import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useSession } from "@/store/session";
import defaultAvatar from "@/assets/default-avatar.png";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router";
import { signOut } from "@/api/auth";

/** 비로그인 시 로그인 버튼, 로그인 시 프로필 이동·로그아웃 팝오버를 표시하는 헤더 버튼 */
export default function ProfileButton() {
  //로그인 유무 확인
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id); //프로필 정보
  if (!session)
    return (
      <Link
        to="/sign-in"
        className="rounded-full bg-[#00ffa3] px-4 py-1.5 text-sm font-semibold text-black transition-opacity hover:opacity-80"
      >
        로그인
      </Link>
    );
  return (
    <Popover>
      <PopoverTrigger>
        <img
          src={profile?.avatar || defaultAvatar}
          className="h-6 w-6 cursor-pointer rounded-full object-cover"
          alt="내 프로필 이미지"
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col p-0">
        <PopoverClose asChild>
          <Link to={`/profile/${session.user.id}`}>
            <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
              프로필
            </div>
          </Link>
        </PopoverClose>
        <PopoverClose asChild>
          <div
            className="hover:bg-muted cursor-pointer px-4 py-3 text-sm"
            onClick={signOut}
          >
            로그아웃
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
