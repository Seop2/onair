import { Link } from "react-router";
import { Megaphone, ChevronLeft } from "lucide-react";
import { useNoticeListData } from "@/hooks/queries/use-notice-data";
import { formatTimeAgo } from "@/lib/time";

/** 공지사항 목록 페이지 */
export default function NoticePage() {
  const { data: notices, isPending, isError } = useNoticeListData();

  return (
    <div className="mx-auto max-w-2xl">
      {/* 헤더 */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="홈으로"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-[#00ffa3]" />
          <h1 className="text-lg font-bold">공지사항</h1>
        </div>
      </div>

      {/* 목록 */}
      <div className="rounded-[10px] border bg-card">
        {isPending &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-b px-5 py-4 last:border-b-0">
              <div className="mb-2 h-4 w-48 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
            </div>
          ))}

        {isError && (
          <p className="text-muted-foreground py-10 text-center text-sm">
            공지사항을 불러오지 못했습니다.
          </p>
        )}

        {!isPending && !isError && notices?.length === 0 && (
          <p className="text-muted-foreground py-10 text-center text-sm">
            등록된 공지사항이 없습니다.
          </p>
        )}

        {!isPending &&
          !isError &&
          notices?.map((notice, index) => (
            <div
              key={notice.id}
              className={`px-5 py-4 ${index < notices.length - 1 ? "border-b" : ""}`}
            >
              <div className="mb-1 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {index === 0 && (
                    <span className="shrink-0 rounded bg-[#00ffa3] px-1.5 py-0.5 text-[10px] font-extrabold text-black">
                      NEW
                    </span>
                  )}
                  <h2 className="text-sm font-semibold leading-snug">
                    {notice.title}
                  </h2>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">
                  {formatTimeAgo(notice.created_at)}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {notice.content}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
