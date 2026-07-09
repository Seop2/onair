import { MessageCircle, Play } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png";
import { formatTimeAgo } from "@/lib/time";
import DeletePostButton from "./delete-post-button";
import EditPostButton from "./edit-post-button";
import { useSession } from "@/store/session";
import { usePostByIdData } from "@/hooks/queries/use-posts-byId";
import Loader from "../loader";
import Fallback from "../fallback";
import LikePostButton from "./like-post-button";
import { Link } from "react-router";
import { useCommentCountData } from "@/hooks/queries/use-comment-count-data";
import { useChannelLive } from "@/hooks/queries/use-posts-channel-live";
import PostMediaCarousel from "./post-media-carousel";
import PostChannelTag from "./post-channel-tag";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface PostItemProps {
  postId: number;
  type: "FEED" | "DETAIL";
}

/** 게시글 단건을 피드(목록 미리보기) 또는 상세 모드로 렌더링하는 카드 컴포넌트 */
export default function PostItem({ postId, type }: PostItemProps) {
  const session = useSession();
  const userId = session?.user.id;

  const { data: post, isPending, error } = usePostByIdData({ postId, type });
  const { data: commentCount } = useCommentCountData(postId);
  const { data: channelLive } = useChannelLive(
    post?.channel_id ? String(post.channel_id) : "",
  );

  if (isPending) return <Loader />;
  if (error || !post) return <Fallback />;

  const liveInfo = channelLive?.content ?? channelLive;
  const isLive = liveInfo?.status?.toUpperCase() === "OPEN";
  const isMine = post.author_id === userId;
  const viewerCount = liveInfo?.concurrentUserCount?.toLocaleString() ?? "0";
  const firstMedia = post.media_urls?.[0] ?? null;
  const VIDEO_EXTS = [".mp4", ".webm", ".mov"];
  const firstMediaIsVideo = firstMedia
    ? VIDEO_EXTS.some((ext) => firstMedia.toLowerCase().endsWith(ext))
    : false;

  if (type === "DETAIL") {
    return (
      <Card className="flex flex-col gap-4 pb-8">
        <CardHeader className="flex justify-between">
          <div className="item-start flex gap-4">
            <Link to={`/profile/${post.author_id}`}>
              <img
                src={post.author.avatar || defaultAvatar}
                alt={`${post.author.nickname}의 프로필 이미지`}
                className="h-10 w-10 rounded-full object-cover"
              />
            </Link>
            <div>
              <div className="font-bold">{post.author.nickname}</div>
              <div className="text-muted-foreground text-sm">
                {formatTimeAgo(post.created_at)}
              </div>
            </div>
          </div>
          <div className="text-muted-foreground flex text-sm">
            {isMine && (
              <>
                <EditPostButton {...post} />
                <DeletePostButton id={post.id} />
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex cursor-pointer flex-col gap-5">
          <div className="whitespace-pre-wrap">{post.content}</div>
          {post.channel_id && post.channel_name && (
            <PostChannelTag
              channelId={post.channel_id}
              channelName={post.channel_name}
              isLive={isLive}
              viewerCount={viewerCount}
            />
          )}
          {post.media_urls && post.media_urls.length > 0 && (
            <PostMediaCarousel mediaUrls={post.media_urls} type={type} />
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <LikePostButton
            id={post.id}
            likeCount={post.like_count}
            isLiked={post.isLiked}
          />
        </CardFooter>
      </Card>
    );
  }

  // FEED 모드 — 썸네일 우측 배치
  return (
    <article className="border-b py-4 last:border-b-0">
      {/* 작성자 정보 */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link to={`/profile/${post.author_id}`}>
            <img
              src={post.author.avatar || defaultAvatar}
              alt={`${post.author.nickname}의 프로필 이미지`}
              className="h-8 w-8 rounded-full object-cover"
            />
          </Link>
          <span className="text-sm font-semibold">{post.author.nickname}</span>
          <span className="text-muted-foreground text-xs">
            {formatTimeAgo(post.created_at)}
          </span>
        </div>
        {isMine && (
          <div className="text-muted-foreground flex text-sm">
            <EditPostButton {...post} />
            <DeletePostButton id={post.id} />
          </div>
        )}
      </div>

      {/* 본문 + 썸네일 */}
      <Link to={`/post/${post.id}`} className="block">
        <div className="flex gap-3">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 whitespace-pre-wrap text-sm font-medium leading-snug">
              {post.content}
            </p>
            {post.channel_id && post.channel_name && (
              <div className="mt-2">
                <PostChannelTag
                  channelId={post.channel_id}
                  channelName={post.channel_name}
                  isLive={isLive}
                  viewerCount={viewerCount}
                />
              </div>
            )}
          </div>
          {firstMedia && (
            <div className="relative h-[72px] w-[108px] shrink-0 overflow-hidden rounded-lg">
              {firstMediaIsVideo ? (
                <>
                  <video
                    src={firstMedia}
                    className="h-full w-full object-cover"
                    preload="metadata"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                </>
              ) : (
                <img
                  src={firstMedia}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          )}
        </div>
      </Link>

      {/* 통계 */}
      <div className="mt-3 flex items-center gap-1">
        <LikePostButton
          id={post.id}
          likeCount={post.like_count}
          isLiked={post.isLiked}
        />
        <Link to={`/post/${post.id}`}>
          <div className="hover:border-mint/30 hover:bg-mint/5 hover:text-mint flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>{commentCount}</span>
          </div>
        </Link>
      </div>
    </article>
  );
}
