import { Link, Outlet } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import ProfileButton from "./header/profile-button";
import ThemeButton from "./header/theme-button";

/** 헤더·메인 컨텐츠·푸터를 포함하는 앱 전체 공통 레이아웃 */
export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="m-auto flex h-14 w-full max-w-[1100px] items-center justify-between px-4">
          <Link to={"/"} className="flex items-center gap-2.5">
            <span className="text-lg font-extrabold tracking-tight text-[#00ffa3]">
              OnAir
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">치지직 라이브 게시판</span>
              <span className="hidden rounded-full bg-[#ef4444] px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white sm:inline">
                LIVE
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeButton />
            <ProfileButton />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-[1100px] flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center text-sm">
        <Analytics />
        <p>lk9050@naver.com</p>
        <p className="mt-2">
          <Link to="/privacy-policy" className="hover:underline">
            개인정보처리방침
          </Link>
        </p>
        <p className="mt-3 text-xs opacity-60">
          OnAir는 NAVER 치지직(CHZZK)과 공식 제휴 관계가 없는 팬 커뮤니티입니다.
        </p>
        <p className="mt-1 text-xs opacity-60">
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
  );
}
