import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useSignUp } from "@/hooks/mutations/auth/use-sign-up";
import { generateErrorMessage } from "@/lib/error";

/** 이메일/비밀번호로 신규 계정을 생성하는 회원가입 페이지 */
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp, isPending } = useSignUp({
    onError: (error) => {
      toast.error(generateErrorMessage(error), { position: "top-center" });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    signUp({ email, password });
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col gap-3">
      {/* 메인 카드 */}
      <div className="flex flex-col gap-5 rounded-lg border bg-card px-8 py-8">
        {/* 로고 */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-extrabold tracking-tight text-mint">
            OnAir
          </span>
          <span className="text-xs text-muted-foreground">
            치지직 라이브 게시판
          </span>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          좋아하는 스트리머 이야기를 함께 나눠요
        </p>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-1 focus:ring-mint/50 disabled:opacity-50"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-1 focus:ring-mint/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending || !email.trim() || !password.trim()}
            className="mt-1 w-full rounded-full bg-mint py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? "가입 중..." : "가입하기"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          가입하면 OnAir 이용약관에 동의하게 됩니다.
        </p>
      </div>

      {/* 로그인 카드 */}
      <div className="rounded-lg border bg-card px-8 py-4 text-center text-sm">
        <span className="text-muted-foreground">이미 계정이 있으신가요? </span>
        <Link
          to="/sign-in"
          className="font-semibold text-mint transition-opacity hover:opacity-80"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
