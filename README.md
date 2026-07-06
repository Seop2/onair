# OnAir — 치지직 라이브 게시판

치지직 스트리머의 **실시간 라이브 현황**을 확인하고, 방송 이야기를 나누는 커뮤니티 서비스입니다.

단순 CRUD를 넘어 **인증·권한 제어(RLS)·외부 API 연동·서버 상태 관리·SEO 최적화**까지 포함한 실서비스형 프론트엔드 프로젝트입니다.

## 배포 링크

- 서비스: [https://onair-forum.vercel.app/](https://onair-forum.vercel.app/)
- 테스트 계정: `123@123.com / 123456`

## 기획 배경

![기획 배경](./public/캡처.png)

평소 이용하던 커뮤니티에서 스트리머의 현재 라이브 여부를 게시글 목록과 함께 한눈에 확인하기 어렵다는 불편함을 느껴 기획했습니다.

## 주요 기능

### 인증
- 이메일 회원가입 / 로그인
- GitHub · Google OAuth 소셜 로그인
- 비밀번호 재설정
- 비로그인 사용자도 피드·게시글·프로필 조회 가능

### 치지직 실시간 연동
- 인기 라이브 스트리머 사이드바 (시청자 수 실시간 표시)
- 게시글 작성 시 스트리머 채널 태그 선택
- 채널 태그에 현재 라이브 여부 LIVE 배지 표시
- 스트리머별 게시글 필터링

### 게시글
- 게시글 작성 / 수정 / 삭제
- 이미지 및 영상 업로드 (Supabase Storage)
- 캐러셀 미디어 뷰어
- 무한 스크롤 피드
- 최신순 / 인기순 정렬

### 댓글
- 댓글 · 대댓글 작성 / 수정 / 삭제

### 좋아요
- 좋아요 추가 / 취소
- 낙관적 업데이트로 즉각적인 UI 반응
- Supabase RPC로 동시성 처리

### 프로필
- 프로필 이미지 · 닉네임 · 소개 수정
- 특정 사용자의 게시글 모아보기

### 기타
- 다크 / 라이트 / 시스템 테마
- 개인정보처리방침 페이지
- Google Search Console · AdSense 연동 준비

## 기술 스택

### Frontend
| 분류 | 기술 |
|---|---|
| 프레임워크 | React 19, TypeScript |
| 빌드 | Vite |
| 스타일링 | Tailwind CSS v4, shadcn/ui |
| 라우팅 | React Router v7 |
| 애니메이션 | Framer Motion |
| UI 컴포넌트 | Embla Carousel, Lucide Icons |

### 상태 관리 / 데이터 패칭
| 분류 | 기술 |
|---|---|
| 서버 상태 | TanStack Query v5 |
| 클라이언트 상태 | Zustand v5 |

### 백엔드 / 인프라
| 분류 | 기술 |
|---|---|
| 인증 | Supabase Auth (Email · GitHub · Google) |
| 데이터베이스 | Supabase PostgreSQL |
| 스토리지 | Supabase Storage |
| 서버리스 | Supabase Edge Functions (Deno) |
| 배포 | Vercel |

## 아키텍처

```
pages → components → hooks/(queries|mutations) → api → supabase / edge functions
```

### 서버 상태 / UI 상태 분리
서버 데이터는 TanStack Query, 모달·세션·테마 같은 UI 상태는 Zustand로 분리해 관심사를 명확히 구분했습니다.

### React Query 캐시 정규화
무한 스크롤 목록은 게시글 ID 배열만 반환하고, 개별 게시글 데이터는 `QUERY_KEYS.post.byId(id)`로 별도 캐시에 저장합니다. 상세 페이지는 이 캐시를 재사용해 중복 요청을 방지합니다.

### 좋아요 낙관적 업데이트
`onMutate`에서 캐시를 즉시 수정하고 `onError`에서 롤백합니다. 실제 DB 처리는 `toggle_post_like` RPC가 원자적으로 수행합니다.

### 치지직 API — Edge Function 중계
브라우저에서 치지직 API를 직접 호출하면 CORS가 발생하므로, 모든 외부 API 호출은 Supabase Edge Function을 경유합니다. 공식 Open API(`openapi.chzzk.naver.com`)를 우선 사용하며, 공식 API에서 제공하지 않는 기능은 별도 표기 후 제한적으로 사용합니다.

### 권한 제어 (RLS)
게시글·댓글·프로필 수정·삭제는 Supabase RLS 정책으로 본인만 가능하도록 제한했습니다.

## 폴더 구조

```
src
├─ api/              # Supabase · Edge Function 호출
├─ components/
│  ├─ layout/        # 헤더·푸터·레이아웃
│  ├─ modal/         # 게시글 작성·프로필 편집 모달
│  ├─ posts/         # 게시글 관련 컴포넌트
│  ├─ comment/       # 댓글 관련 컴포넌트
│  ├─ profile/       # 프로필 컴포넌트
│  └─ ui/            # shadcn 기본 컴포넌트
├─ hooks/
│  ├─ queries/       # useQuery · useInfiniteQuery 훅
│  └─ mutations/     # useMutation 훅
├─ pages/            # 라우트 페이지
├─ provider/         # SessionProvider · ModalProvider
├─ store/            # Zustand 전역 상태
├─ lib/              # 상수 · 유틸
└─ types.ts          # 공통 타입
```

## DB 구조

![DB 구조](./public/onebiteDB.png)

## 트러블슈팅

### 치지직 API CORS 문제
**문제** 브라우저에서 치지직 API 직접 호출 시 CORS 오류 발생

**해결** Supabase Edge Function으로 서버 측 중계. 프론트는 Edge Function만 호출하도록 변경

### 좋아요 동시성 문제
**문제** 빠른 연속 클릭 시 좋아요 상태가 불일치할 수 있음

**해결** DB RPC(`toggle_post_like`)로 토글 로직을 서버에 위임해 원자적 처리

### 무한 스크롤 중복 요청
**문제** 목록 → 상세 이동 시 동일 게시글을 다시 fetch

**해결** 목록 조회 시 개별 게시글 캐시를 동시에 세팅하는 정규화 구조로 해결

### 비로그인 피드 접근 시 null 오류
**문제** 공개 피드 전환 후 `session!.user.id` 참조로 TypeError 발생

**해결** `session?.user.id`로 수정, 좋아요 필터에 nil UUID(`00000000-...`) 폴백 적용

## 실행 방법

```bash
npm install
npm run dev
```

## 환경 변수

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
```

Edge Function 환경 변수:

```bash
supabase secrets set CHZZK_CLIENT_ID=...
supabase secrets set CHZZK_CLIENT_SECRET=...
```

## SEO / 접근성

- Open Graph · Twitter Card · JSON-LD 구조화 데이터 적용
- `sitemap.xml` · `robots.txt` 구성
- Google Search Console 인증 완료
- 이미지 `alt` 속성, 버튼 `aria-label` 전수 적용
- Google AdSense 심사 준비 완료

## 고지사항

OnAir는 NAVER 치지직(CHZZK)과 공식 제휴 관계가 없는 팬 커뮤니티입니다.
