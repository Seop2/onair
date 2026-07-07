import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";
import { useRequestPasswordResetEmail } from "../hooks/mutations/auth/use-request-reset-email";
import { generateErrorMessage } from "@/lib/error";

/** 이메일 입력 후 비밀번호 재설정 링크를 전송하는 페이지 */
export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  const { mutate: requestPasswordResetEmail, isPending } =
    useRequestPasswordResetEmail({
      onSuccess: () => {
        toast.info("인증 메일이 전송되었습니다.", { position: "top-center" });
        setEmail("");
      },
      onError: (error) => {
        toast.error(generateErrorMessage(error), { position: "top-center" });
        setEmail("");
      },
    });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    requestPasswordResetEmail(email);
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col gap-3">
      {/* 메인 카드 */}
      <div className="flex flex-col gap-5 rounded-xl border bg-card px-8 py-8">
        {/* 로고 */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-extrabold tracking-tight text-[#00ffa3]">
            OnAir
          </span>
          <span className="text-xs text-muted-foreground">
            치지직 라이브 게시판
          </span>
        </div>

        {/* 자물쇠 아이콘 + 설명 */}
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full border-2 border-[#00ffa3]/40 p-3">
            <LockKeyhole className="h-7 w-7 text-[#00ffa3]" />
          </div>
          <p className="text-sm font-semibold">로그인에 문제가 있나요?</p>
          <p className="text-center text-xs text-muted-foreground">
            이메일 주소를 입력하면 비밀번호를 재설정할 수 있는 링크를
            보내드립니다.
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="w-full rounded-[10px] border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-1 focus:ring-[#00ffa3]/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending || !email.trim()}
            className="w-full rounded-full bg-[#00ffa3] py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "전송 중..." : "인증 링크 보내기"}
          </button>
        </form>

        {/* 구분선 */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">또는</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Link
          to="/sign-up"
          className="text-center text-sm font-semibold text-muted-foreground transition-colors hover:text-[#00cc82]"
        >
          새 계정 만들기
        </Link>
      </div>

      {/* 로그인으로 돌아가기 카드 */}
      <div className="rounded-xl border bg-card px-8 py-4 text-center text-sm">
        <Link
          to="/sign-in"
          className="font-semibold text-[#00ffa3] transition-opacity hover:opacity-80"
        >
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
