import { useProfileData } from "@/hooks/queries/use-profile-data";
import Fallback from "../fallback";
import Loader from "../loader";
import defaultAvatar from "@/assets/default-avatar.png";
import { useSession } from "@/store/session";
import EditProfileButton from "./edit-profile-button";

/** 사용자 프로필 이미지·닉네임·소개를 표시하고, 본인 프로필이면 수정 버튼을 노출 */
export default function ProfileInfo({ userId }: { userId: string }) {
  const session = useSession();

  const {
    data: profile,
    error: fetchProfileError,
    isPending: isPendingProfilePending,
  } = useProfileData(userId);

  if (fetchProfileError) return <Fallback />;
  if (isPendingProfilePending) return <Loader />;

  const isMine = session?.user.id === userId; //세션 로그인 본인 여부 검증

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        src={profile.avatar || defaultAvatar}
        className="h-30 w-30 rounded-full object-cover"
        alt={`${profile.nickname}의 프로필 이미지`}
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile.nickname}</div>
        <div className="text-muted-foreground">{profile.bio}</div>
      </div>
      {isMine && <EditProfileButton />}
    </div>
  );
}
