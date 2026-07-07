import { Radio, Tv } from "lucide-react";

interface PostChannelTagProps {
  channelId: string | number;
  channelName: string;
  isLive: boolean;
  viewerCount: string;
}

/** 게시글에 태그된 치지직 채널을 표시하며, 클릭 시 해당 채널 라이브 페이지로 이동 */
export default function PostChannelTag({
  channelId,
  channelName,
  isLive,
  viewerCount,
}: PostChannelTagProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const chzzkUrl = `https://chzzk.naver.com/live/${channelId}`;
    window.open(chzzkUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap">
      <div
        onClick={handleClick}
        className={`group flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 transition-all ${
          isLive
            ? "border-[#ef4444]/50 bg-[#ef4444]/10 hover:bg-[#ef4444]/20"
            : "border-[#00ffa3]/20 bg-[#00ffa3]/10 hover:bg-[#00ffa3]/20"
        }`}
      >
        <div className="relative">
          <Tv className="h-3.5 w-3.5 text-[#00ffa3] transition-transform group-hover:scale-110" />

          {isLive && (
            <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            </span>
          )}
        </div>

        <span className="text-xs font-bold text-[#00cc82]">{channelName}</span>

        {isLive && (
          <div className="ml-1 flex items-center gap-1 border-l border-[#ef4444]/30 pl-2">
            <Radio className="h-2.5 w-2.5 animate-pulse text-[#ef4444]" />
            <span className="text-[10px] font-black text-[#ef4444]">
              LIVE {viewerCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
