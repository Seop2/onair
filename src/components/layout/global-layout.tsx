import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { Home, Flame, Clock, Megaphone, PenLine, ChevronRight } from "lucide-react";
import ProfileButton from "./header/profile-button";
import ThemeButton from "./header/theme-button";
import { useOpenCreatePostModal } from "@/store/post-editor-modal";
import { useSession } from "@/store/session";
import { useLatestNotice } from "@/hooks/queries/use-notice-data";

const NAV_ITEMS = [
  { to: "/", icon: Home, label: "홈" },
  { to: "/?sort=like_count", icon: Flame, label: "인기 게시글" },
  { to: "/?sort=created_at", icon: Clock, label: "최신 게시글" },
  { to: "/notice", icon: Megaphone, label: "공지사항" },
];

function SidebarWriteButton() {
  const openCreatePostModal = useOpenCreatePostModal();
  const session = useSession();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!session) { navigate("/sign-in"); return; }
    openCreatePostModal();
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00ffa3] py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
    >
      <PenLine className="h-4 w-4" />
      글쓰기
    </button>
  );
}

function NoticeBar() {
  const { data: notice } = useLatestNotice();
  if (!notice) return null;

  return (
    <Link
      to="/notice"
      className="group flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-full border border-[#00ffa3]/20 bg-[#00ffa3]/5 px-3 py-1.5 transition-colors hover:border-[#00ffa3]/40 hover:bg-[#00ffa3]/10"
    >
      <Megaphone className="h-3.5 w-3.5 shrink-0 text-[#00ffa3]" />
      <span className="text-muted-foreground truncate text-xs font-medium">
        <span className="mr-1.5 text-[#00ffa3] font-semibold">공지</span>
        {notice.title}
      </span>
      <ChevronRight className="h-3 w-3 shrink-0 text-[#00ffa3]/50 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** 좌측 사이드바 + 메인 컨텐츠 영역으로 구성되는 앱 공통 레이아웃 */
export default function GlobalLayout() {
  const location = useLocation();

  const isNavActive = (to: string) => {
    if (to === "/notice") return location.pathname === "/notice";
    if (to === "/") return location.pathname === "/" && !location.search;
    return location.pathname + location.search === to;
  };

  return (
    <div className="flex min-h-screen">
      {/* 좌측 사이드바 — 데스크톱 전용 */}
      <aside className="fixed top-0 left-0 z-40 hidden h-screen w-56 flex-col border-r bg-background lg:flex">
        {/* 로고 */}
        <Link to="/" className="flex flex-col gap-0.5 px-5 py-5">
          <span className="text-xl font-extrabold tracking-tight text-[#00ffa3]">
            OnAir
          </span>
          <span className="text-xs text-muted-foreground">
            치지직 라이브 게시판
          </span>
        </Link>

        {/* 내비게이션 */}
        <nav className="flex flex-col gap-1 px-3">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors ${
                isNavActive(to)
                  ? "bg-[#00ffa3]/10 text-[#00ffa3]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* 글쓰기 버튼 */}
        <div className="px-4 pb-4">
          <SidebarWriteButton />
        </div>

        {/* 푸터 */}
        <div className="border-t px-4 py-3">
          <p className="text-[10px] text-muted-foreground">
            © 2024 OnAir · 치지직 팬 커뮤니티
          </p>
          <div className="mt-1 flex gap-2 text-[10px] text-muted-foreground">
            <Link to="/privacy-policy" className="hover:underline">
              개인정보처리방침
            </Link>
            <span>·</span>
            <a href="mailto:lk9050@naver.com" className="hover:underline">
              문의
            </a>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground opacity-50">
            NAVER 치지직과 공식 제휴 관계가 없는 팬 커뮤니티입니다.
          </p>
        </div>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex min-h-screen flex-1 flex-col lg:ml-56">
        {/* 모바일 헤더 */}
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md lg:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-[#00ffa3]">
                OnAir
              </span>
            </Link>
            <div className="flex min-w-0 flex-1 items-center px-3">
              <NoticeBar />
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <ThemeButton />
              <ProfileButton />
            </div>
          </div>
        </header>

        {/* 데스크톱 상단 바 */}
        <header className="sticky top-0 z-30 hidden h-14 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-md lg:flex">
          {/* 최신 공지 배너 */}
          <div className="min-w-0 flex-1">
            <NoticeBar />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <ThemeButton />
            <ProfileButton />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-6">
          <Outlet />
        </main>

        <footer className="border-t py-5 text-center text-xs text-muted-foreground">
          <Analytics />
          <p className="opacity-60">
            OnAir는 NAVER 치지직(CHZZK)과 공식 제휴 관계가 없는 팬 커뮤니티입니다.
          </p>
          <p className="mt-1 opacity-60">
            Icon by{" "}
            <a
              href="https://icons8.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Icons8
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
