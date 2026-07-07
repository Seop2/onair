import useTogglePostLike from "@/hooks/mutations/posts/use-toggle-likes-posts";
import { useSession } from "@/store/session";
import { HeartIcon } from "lucide-react";
import { toast } from "sonner";

/**
 * 좋아요 버튼 컴포넌트
 */
export default function LikePostButton({
  id,
  likeCount,
  isLiked,
}: {
  id: number;
  likeCount: number;
  isLiked: boolean;
}) {
  const session = useSession();

  const { mutate: togglePostLike, isPending } = useTogglePostLike({
    onError: (error) => {
      toast.error("좋아요 요청에 실패했습니다.", { position: "top-center" });
    },
  });

  const handleLikeClick = () => {
    if (!session) {
      toast.error("로그인이 필요합니다.", { position: "top-center" });
      return;
    }
    togglePostLike({
      postId: id,
      userId: session.user.id,
    });
  };

  return (
    <div
      onClick={handleLikeClick}
      className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
        isLiked
          ? "border-[#00ffa3]/40 bg-[#00ffa3]/10 text-[#00ffa3]"
          : "hover:border-[#00ffa3]/30 hover:bg-[#00ffa3]/5 hover:text-[#00ffa3]"
      }`}
    >
      <HeartIcon
        className={`h-4 w-4 transition-all ${isLiked ? "fill-[#00ffa3] stroke-[#00ffa3]" : ""}`}
      />
      <span>{likeCount}</span>
    </div>
  );
}
