import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { useSearchParams } from "react-router";
import PostFeed from "../components/posts/post-feed";
import StreamerFilter from "@/components/posts/streamer-filter";
import LiveStreamersSidebar from "@/components/live-streamers-sidebar";
import { useTopLiveStreamers } from "@/hooks/queries/use-top-live-streamers";
import defaultAvatar from "@/assets/default-avatar.png";

interface SelectedChannel {
  channelId: string;
  channelName: string;
  channelImageUrl: string | null;
}

const TABS = [
  { id: "all", label: "전체" },
  { id: "popular", label: "인기" },
  { id: "latest", label: "최신" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function ChannelBanner({
  channel,
  onClear,
}: {
  channel: SelectedChannel;
  onClear: () => void;
}) {
  const { data: streamers } = useTopLiveStreamers();
  const live = streamers?.find((s) => s.channelId === channel.channelId);

  return (
    <div className="relative overflow-hidden rounded-lg border bg-card">
      {live?.liveThumbnailUrl && (
        <>
          <img
            src={live.liveThumbnailUrl}
            className="absolute inset-0 h-full w-full object-cover opacity-10"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
        </>
      )}
      <div className="relative flex items-center gap-4 px-4 py-3">
        <img
          src={channel.channelImageUrl ?? defaultAvatar}
          className={`h-10 w-10 shrink-0 rounded-full object-cover ${live ? "ring-2 ring-mint/40" : ""}`}
          alt={channel.channelName}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{channel.channelName}</span>
            {live && (
              <span className="rounded bg-live px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                LIVE
              </span>
            )}
          </div>
          {live?.liveTitle && (
            <p className="text-muted-foreground truncate text-xs">
              {live.liveTitle}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {live && (
            <div className="text-right">
              <div className="text-sm font-bold tabular-nums">
                {live.concurrentUserCount.toLocaleString()}명
              </div>
              <div className="text-muted-foreground text-[10px]">시청 중</div>
            </div>
          )}
          {live && (
            <a
              href={`https://chzzk.naver.com/live/${channel.channelId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-full border border-mint/20 bg-mint/10 px-3 py-1.5 text-xs font-bold text-mint transition-colors hover:bg-mint/20"
            >
              방송 보기
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          <button
            onClick={onClear}
            aria-label="선택 해제"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IndexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedChannel, setSelectedChannel] =
    useState<SelectedChannel | null>(null);
  const [filterKey, setFilterKey] = useState(0);

  const sortParam = searchParams.get("sort");
  const activeTab: TabId =
    sortParam === "like_count" ? "popular" : sortParam === "created_at" ? "latest" : "all";
  const sortBy: "created_at" | "like_count" =
    activeTab === "popular" ? "like_count" : "created_at";

  function handleTabChange(tab: TabId) {
    if (tab === "popular") setSearchParams({ sort: "like_count" });
    else if (tab === "latest") setSearchParams({ sort: "created_at" });
    else setSearchParams({});
  }

  function handleSelectChannel(
    channelId: string,
    channelName: string,
    channelImageUrl: string | null,
  ) {
    setSelectedChannel({ channelId, channelName, channelImageUrl });
    setFilterKey((k) => k + 1);
  }

  function handleClearChannel() {
    setSelectedChannel(null);
    setFilterKey((k) => k + 1);
  }

  return (
    <div className="flex gap-8">
      {/* 메인 피드 */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {/* 선택된 채널 배너 */}
        {selectedChannel && (
          <ChannelBanner channel={selectedChannel} onClear={handleClearChannel} />
        )}

        {/* 스트리머 필터 */}
        <StreamerFilter
          key={filterKey}
          onSelect={(channel) => {
            if (channel) {
              handleSelectChannel(
                channel.channelId,
                channel.channelName,
                channel.channelImageUrl,
              );
            } else {
              handleClearChannel();
            }
          }}
        />

        {/* 카테고리 탭 */}
        <div className="flex gap-0 border-b">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`-mb-px border-b-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "border-mint text-mint"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <PostFeed sortBy={sortBy} channelId={selectedChannel?.channelId} />
      </div>

      {/* 우측 사이드바 */}
      <div className="hidden lg:block">
        <LiveStreamersSidebar onSelectChannel={handleSelectChannel} />
      </div>
    </div>
  );
}
