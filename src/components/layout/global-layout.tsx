import { Link, Outlet } from "react-router";
import ProfileButton from "./header/profile-button";
import ThemeButton from "./header/theme-button";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <header className="border-b">
        <div className="m-auto flex h-14 w-full max-w-[1100px] items-center justify-between px-4">
          <Link to={"/"} className="flex items-center gap-2.5">
            <span className="text-lg font-extrabold tracking-tight text-[#00ffa3]">
              OnAir
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold">치지직 라이브 게시판</span>
              <span className="hidden rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white sm:inline">
                LIVE
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-5">
            <ThemeButton />
            <ProfileButton />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-[1100px] flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center text-sm">
        <p>lk9050@naver.com</p>
        <p className="mt-2">
          <Link to="/privacy-policy" className="hover:underline">
            개인정보처리방침
          </Link>
        </p>
        <p className="mt-3 text-xs opacity-60">
          OnAir는 NAVER 치지직(CHZZK)과 공식 제휴 관계가 없는 팬 커뮤니티입니다.
        </p>
      </footer>
    </div>
  );
}
