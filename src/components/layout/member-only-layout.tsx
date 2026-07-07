import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

/** 비로그인 사용자를 로그인 페이지로 리다이렉트하는 회원 전용 레이아웃 */
export default function MemberOnlyLayout() {
  const session = useSession();
  if (!session) return <Navigate to={"/sign-in"} replace={true} />;
  return <Outlet />;
}
