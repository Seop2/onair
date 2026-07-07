# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # 개발 서버 실행 (Vite)
npm run build        # 타입 체크 + 프로덕션 빌드
npm run lint         # ESLint 실행
npx tsc --noEmit     # 빌드 없이 타입 체크만
npm run type-gen     # Supabase DB 스키마로 TypeScript 타입 자동 생성
```

### Edge Functions 배포

```bash
supabase functions deploy chzzk-search --no-verify-jwt
supabase functions deploy chzzk-top-lives --no-verify-jwt
```

Edge Function 환경변수 등록:
```bash
supabase secrets set CHZZK_CLIENT_ID=...
supabase secrets set CHZZK_CLIENT_SECRET=...
```

## 환경 변수 (`.env`)

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
```

## 아키텍처

### 레이어 구조

```
pages → components → hooks/(queries|mutations) → api → supabase / edge functions
```

- **`src/api/`** — Supabase 클라이언트 및 Edge Function 호출. 외부 통신은 전부 여기에 위치
- **`src/hooks/queries/`** — React Query `useQuery` / `useInfiniteQuery` 훅
- **`src/hooks/mutations/`** — React Query `useMutation` 훅 (auth/comment/posts/profile 하위 분류)
- **`src/store/`** — Zustand 전역 UI 상태 (session, modal, theme)
- **`src/provider/`** — `SessionProvider` (Supabase auth 구독), `ModalProvider` (portal로 modal 마운트)
- **`src/pages/`** — 라우트 페이지 컴포넌트
- **`src/components/`** — UI 컴포넌트 (`ui/`는 shadcn, 나머지는 도메인별)

### 라우팅

`root-route.tsx`에서 두 개의 레이아웃 트리로 분리됨:

- **`AuthLayout`** (`/sign-in`, `/sign-up`, `/forget-password`) — 헤더 없는 풀페이지 레이아웃, 세션 체크 포함
- **`GlobalLayout`** + **`MemberOnlyLayout`** (`/`, `/post/:postId`, etc.) — 헤더/푸터 포함, 미로그인 시 리다이렉트

### React Query 캐시 정규화

목록 조회(`useInfinitePostData`)는 ID 배열만 반환하고, 각 게시글 데이터는 `QUERY_KEYS.post.byId(id)`로 개별 캐시에 저장한다. 상세 페이지(`PostItem type="DETAIL"`)는 이 캐시를 재사용하며 `enabled: false`로 별도 fetch를 막는다.

### 좋아요 낙관적 업데이트

`use-toggle-likes-posts.ts`에서 `onMutate`에 캐시를 즉시 수정하고, `onError`에서 이전 값으로 롤백한다. 실제 DB 처리는 Supabase RPC(`toggle_post_like`)가 원자적으로 수행한다.

### 치지직 API / Edge Functions

브라우저에서 치지직 API를 직접 호출하면 CORS가 발생하므로 **반드시 Supabase Edge Function을 경유**해야 한다.

- **`chzzk-search`** — 채널 검색 + 라이브 상태 조회. `mode: "top-lives"` 파라미터로 인기 라이브 목록도 담당
- **`chzzk-top-lives`** — 공식 Open API(`openapi.chzzk.naver.com/open/v1/lives`) 1차 시도, 빈 배열이면 시드 키워드 기반 검색으로 폴백
- **`chzzk-live`** — 개별 채널 라이브 상태 조회

> **주의**: 새 Edge Function을 만들면 배포/시작 오류 시 OPTIONS 요청에 non-2xx가 반환되어 CORS 오류로 나타난다. 기능 추가 시 기존 함수를 확장하는 방식을 우선 검토할 것.

### 쿼리 키 관리

`src/lib/constants.ts`의 `QUERY_KEYS` 객체를 모든 훅에서 공유한다. 새 쿼리를 추가할 때 이 객체에 먼저 키를 정의한다.

### 모달 시스템

Zustand 스토어(`src/store/*.ts`)에 open/close 액션을 정의하고, `ModalProvider`가 `createPortal`로 `#modal-root`에 마운트한다. 모달 열기는 훅(`useOpenCreatePostModal` 등)을 통해서만 한다.

### 스타일링

Tailwind CSS v4 사용. 치지직 브랜드 색상은 `#00ffa3`(그린), 라이브 표시는 `red-500`. shadcn/ui 컴포넌트는 `src/components/ui/`에 위치하며, auth 페이지들은 shadcn을 사용하지 않고 plain HTML 요소에 Tailwind 직접 적용.

<!-- omd:start v=1 hash=672475c77b07 -->
# Design System (oh-my-design)

The authoritative brand & UI spec is **@./DESIGN.md**.
Read before any UI/styling/microcopy/motion work.

Preference log (pending corrections): @./.omd/preferences.md

Precedence: DESIGN.md > preferences.md > your defaults.
<!-- omd:end -->
