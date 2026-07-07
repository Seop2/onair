import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

/** 로그인된 사용자를 홈으로 리다이렉트하는 인증 페이지 전용 레이아웃 (헤더 없음) */
export default function AuthLayout() {
  const session = useSession();
  if (session) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Outlet />
    </div>
  );
}
