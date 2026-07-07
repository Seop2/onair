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
      className="hover:bg-muted/50 flex w-full items-center gap-4 border-t px-2 py-3 text-left transition-colors first:border-t-0"
    >
      {/* 순위 */}
      <span
        className={`w-6 shrink-0 text-center text-lg font-bold tabular-nums ${
          rank <= 3 ? "text-[#00cc82]" : "text-muted-foreground"
        }`}
      >
        {rank}
      </span>

      {/* 프로필 이미지 */}
      <img
        src={streamer.channelImageUrl ?? defaultAvatar}
        alt={streamer.channelName}
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#00ffa3]/40"
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
        <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
        <span className="text-sm font-bold tabular-nums">
          {streamer.concurrentUserCount.toLocaleString()}명
        </span>
      </div>
    </button>
  );
}

interface LiveStreamersSidebarProps {
  onSelectChannel: (channelId: string, channelName: string, channelImageUrl: string | null) => void;
}

/** 인기 라이브 스트리머 목록을 순위별로 표시하는 우측 사이드바 (데스크톱 전용) */
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

  const updatedLabel = dataUpdatedAt
    ? getRelativeTime(dataUpdatedAt)
    : "";

  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-6 rounded-xl border bg-card">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">지금 방송 중</span>
            <span className="rounded-full bg-[#ef4444] px-2 py-0.5 text-[11px] font-bold text-white">
              LIVE
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
                className={`h-3.5 w-3.5 ${isRefetching ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* 목록 */}
        <div className="px-2 pb-3">
          {isPending &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-t px-2 py-3 first:border-t-0"
              >
                <div className="h-5 w-5 animate-pulse rounded bg-muted" />
                <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}

          {isError && (
            <p className="text-muted-foreground py-6 text-center text-sm">
              불러오기 실패
            </p>
          )}

          {!isPending && !isError && (!streamers || streamers.length === 0) && (
            <p className="text-muted-foreground py-6 text-center text-sm">
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
