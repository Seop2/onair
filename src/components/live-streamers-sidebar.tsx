import { RefreshCw } from "lucide-react";
import { useTopLiveStreamers } from "@/hooks/queries/use-top-live-streamers";
import type { LiveStreamer } from "@/api/chzzk";
import defaultAvatar from "@/assets/default-avatar.png";

function StreamerRow({
  rank,
  streamer,
  onSelect,
}: {
  rank: number;
  streamer: LiveStreamer;
  onSelect: (channelId: string, channelName: string, channelImageUrl: string | null) => void;
}) {
  return (
    <button
      onClick={() => onSelect(streamer.channelId, streamer.channelName, streamer.channelImageUrl)}
      className="hover:bg-muted/50 flex w-full items-center gap-3 border-t px-3 py-2.5 text-left transition-colors first:border-t-0"
    >
      {/* 순위 */}
      <span
        className={`w-5 shrink-0 text-center text-sm font-bold tabular-nums ${
          rank <= 3 ? "text-[#00cc82]" : "text-muted-foreground"
        }`}
      >
        {rank}
      </span>

      {/* 프로필 이미지 */}
      <img
        src={streamer.channelImageUrl ?? defaultAvatar}
        alt={streamer.channelName}
        className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-[#00ffa3]/40"
      />

      {/* 채널명 + 방송 제목 */}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold">{streamer.channelName}</div>
        {streamer.liveTitle && (
          <div className="text-muted-foreground truncate text-xs">
            {streamer.liveTitle}
          </div>
        )}
      </div>

      {/* 시청자 수 */}
      <div className="flex shrink-0 items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
        <span className="text-xs font-bold tabular-nums">
          {streamer.concurrentUserCount >= 10000
            ? `${(streamer.concurrentUserCount / 10000).toFixed(1)}만`
            : streamer.concurrentUserCount.toLocaleString()}
        </span>
      </div>
    </button>
  );
}

interface LiveStreamersSidebarProps {
  onSelectChannel: (channelId: string, channelName: string, channelImageUrl: string | null) => void;
}

/** 인기 라이브 스트리머 TOP 10 + 커뮤니티 가이드를 표시하는 우측 사이드바 (데스크톱 전용) */
export default function LiveStreamersSidebar({
  onSelectChannel,
}: LiveStreamersSidebarProps) {
  const {
    data: streamers,
    isPending,
    isError,
    dataUpdatedAt,
    refetch,
    isRefetching,
  } = useTopLiveStreamers();

  const updatedLabel = dataUpdatedAt ? getRelativeTime(dataUpdatedAt) : "";

  return (
    <aside className="w-72 shrink-0 space-y-3">
      {/* 라이브 스트리머 TOP 10 */}
      <div className="sticky top-20 space-y-3">
        <div className="rounded-[10px] border bg-card">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">지금 라이브 중인 스트리머</span>
              <span className="rounded bg-[#ef4444] px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                TOP 10
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <span>{updatedLabel}</span>
              <button
                onClick={() => refetch()}
                disabled={isRefetching}
                className="hover:text-foreground transition-colors"
                aria-label="라이브 목록 새로고침"
              >
                <RefreshCw
                  className={`h-3 w-3 ${isRefetching ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* 목록 */}
          <div className="pb-2">
            {isPending &&
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-t px-3 py-2.5 first:border-t-0"
                >
                  <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                  <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                    <div className="h-2.5 w-28 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}

            {isError && (
              <p className="text-muted-foreground py-5 text-center text-sm">
                불러오기 실패
              </p>
            )}

            {!isPending && !isError && (!streamers || streamers.length === 0) && (
              <p className="text-muted-foreground py-5 text-center text-sm">
                현재 라이브 중인 스트리머가 없습니다
              </p>
            )}

            {!isPending &&
              !isError &&
              streamers?.map((streamer, i) => (
                <StreamerRow
                  key={streamer.channelId}
                  rank={i + 1}
                  streamer={streamer}
                  onSelect={onSelectChannel}
                />
              ))}
          </div>

          {/* 더보기 */}
          <div className="border-t px-3 py-2">
            <a
              href="https://chzzk.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#00cc82] flex w-full items-center justify-center gap-1 text-xs font-medium transition-colors"
            >
              치지직에서 더보기
              <span className="text-[10px]">›</span>
            </a>
          </div>
        </div>

        {/* 커뮤니티 이용 가이드 */}
        <div className="rounded-[10px] border bg-card px-4 py-3">
          <div className="mb-2 flex items-center gap-1.5 text-sm font-bold">
            <span>📋</span>
            <span>커뮤니티 이용 가이드</span>
          </div>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            <li>· 서로를 존중하는 건강한 소통 문화를 만들어요</li>
            <li>· 욕설, 비방, 도배 게시글은 제재될 수 있어요</li>
            <li>· 스트리머 관련 이야기는 채널 태그를 달아주세요</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

function getRelativeTime(ms: number) {
  const diff = Math.floor((Date.now() - ms) / 1000);
  if (diff < 10) return "방금 전";
  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  return `${Math.floor(diff / 3600)}시간 전`;
}
