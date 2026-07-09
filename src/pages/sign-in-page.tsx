import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import githubLogo from "@/assets/github-mark.svg";
import googleLogo from "@/assets/google-logo.png";
import { useSignInWithPassword } from "@/hooks/mutations/auth/use-sign-in-password";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/use-sign-in-with-Oauth";
import { generateErrorMessage } from "@/lib/error";

/** 이메일/비밀번호 및 소셜(GitHub·Google) 로그인을 지원하는 로그인 페이지 */
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        toast.error(generateErrorMessage(error), { position: "top-center" });
        setPassword("");
      },
    });

  const { mutate: signInWithOAuth, isPending: isOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        toast.error(generateErrorMessage(error), { position: "top-center" });
      },
    });

  const isPending = isPasswordPending || isOAuthPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    signInWithPassword({ email, password });
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
            {isPasswordPending ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* OR 구분선 */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">또는</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* 소셜 로그인 */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => signInWithOAuth("github")}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
          >
            <img src={githubLogo} className="h-4 w-4 dark:invert" alt="GitHub" />
            GitHub으로 로그인
          </button>
          <button
            onClick={() => signInWithOAuth("google")}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
          >
            <img src={googleLogo} className="h-4 w-4" alt="Google" />
            Google로 로그인
          </button>
        </div>

        {/* 비밀번호 찾기 */}
        <Link
          to="/forget-password"
          className="text-center text-xs text-muted-foreground transition-colors hover:text-mint-deep"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      {/* 회원가입 카드 */}
      <div className="rounded-lg border bg-card px-8 py-4 text-center text-sm">
        <span className="text-muted-foreground">계정이 없으신가요? </span>
        <Link
          to="/sign-up"
          className="font-semibold text-mint transition-opacity hover:opacity-80"
        >
          가입하기
        </Link>
      </div>
    </div>
  );
}
