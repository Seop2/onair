/** 개인정보처리방침 정적 콘텐츠 페이지 */
export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="mb-8 text-2xl font-bold">개인정보처리방침</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">1. 수집하는 개인정보 항목</h2>
        <p className="text-muted-foreground leading-7">
          OnAir는 서비스 이용 시 다음의 개인정보를 수집합니다.
        </p>
        <ul className="text-muted-foreground mt-2 list-disc pl-5 leading-7">
          <li>이메일 주소 (회원가입 및 로그인)</li>
          <li>닉네임, 프로필 이미지 (선택)</li>
          <li>서비스 이용 기록, 접속 로그</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">2. 개인정보의 수집 및 이용 목적</h2>
        <ul className="text-muted-foreground list-disc pl-5 leading-7">
          <li>회원 식별 및 서비스 제공</li>
          <li>게시글, 댓글 등 사용자 생성 콘텐츠 관리</li>
          <li>서비스 개선 및 통계 분석</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">3. 개인정보의 보유 및 이용 기간</h2>
        <p className="text-muted-foreground leading-7">
          회원 탈퇴 시까지 보유하며, 탈퇴 즉시 파기합니다. 단, 관계 법령에 따라
          보존이 필요한 경우 해당 기간 동안 보관합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">4. 개인정보의 제3자 제공</h2>
        <p className="text-muted-foreground leading-7">
          OnAir는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
          단, 이용자의 동의가 있거나 법령에 의거한 경우는 예외로 합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">5. 개인정보 보호를 위한 기술적 조치</h2>
        <p className="text-muted-foreground leading-7">
          개인정보는 Supabase를 통해 암호화하여 저장·관리하며, 인증된 사용자만
          접근할 수 있도록 Row Level Security(RLS)를 적용하고 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">6. 이용자의 권리</h2>
        <p className="text-muted-foreground leading-7">
          이용자는 언제든지 자신의 개인정보를 조회·수정·삭제할 수 있으며,
          회원 탈퇴를 통해 개인정보 처리 정지를 요청할 수 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">7. 개인정보 보호책임자 연락처</h2>
        <p className="text-muted-foreground leading-7">
          개인정보 관련 문의사항은 아래로 연락주시기 바랍니다.
          <br />
          이메일: lk9050@naver.com
        </p>
      </section>

      <p className="text-muted-foreground mt-10 text-sm">
        본 방침은 2026년 7월 6일부터 적용됩니다.
      </p>
    </div>
  );
}
