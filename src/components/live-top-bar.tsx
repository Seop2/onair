import { useTopLiveStreamers } from "@/hooks/queries/use-top-live-streamers";
import defaultAvatar from "@/assets/default-avatar.png";

function fmtCount(n: number) {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천`;
  return n.toLocaleString();
}

interface LiveTopBarProps {
  selectedChannelId?: string;
  onSelect: (
    channelId: string,
    channelName: string,
    channelImageUrl: string | null,
  ) => void;
}

/** 상단에 가로 스크롤로 현재 라이브 중인 스트리머 채널 칩을 표시하는 바 */
export default function LiveTopBar({
  selectedChannelId,
  onSelect,
}: LiveTopBarProps) {
  const { data: streamers, isPending } = useTopLiveStreamers();

  return (
    <div className="flex items-center gap-3 border-b pb-3">
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
        <span className="text-[11px] font-extrabold tracking-widest text-live">
          LIVE
        </span>
      </div>

      <div
        className="flex flex-1 gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {isPending &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted h-7 w-20 shrink-0 animate-pulse rounded-full"
            />
          ))}

        {streamers?.map((s) => (
          <button
            key={s.channelId}
            onClick={() => onSelect(s.channelId, s.channelName, s.channelImageUrl)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedChannelId === s.channelId
                ? "bg-mint/15 text-mint ring-1 ring-mint/40"
                : "bg-muted/60 text-foreground hover:bg-mint/10 hover:text-mint"
            }`}
          >
            <img
              src={s.channelImageUrl ?? defaultAvatar}
              alt={s.channelName}
              className="h-4 w-4 rounded-full object-cover"
            />
            <span>{s.channelName}</span>
            <span className="opacity-50">{fmtCount(s.concurrentUserCount)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
