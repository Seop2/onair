# OnAir — 치지직 라이브 게시판

**치지직 스트리머의 실시간 라이브 현황**과 **방송 이야기를 나누는 커뮤니티**를 하나의 화면에서 경험할 수 있는 팬 커뮤니티 서비스입니다.

🔗 **서비스**: [https://onair-forum.vercel.app/](https://onair-forum.vercel.app/)  
👤 **테스트 계정**: `123@123.com` / `123456`

---

## 프로젝트 소개

### 왜 이 프로젝트를 만들었나요?

![기획 배경](./public/캡처.png)

평소 이용하던 커뮤니티에서 스트리머의 라이브 여부를 게시글 목록과 함께 한눈에 확인하기 어렵다는 불편함을 느꼈습니다. 게시판과 스트리밍 플랫폼을 번갈아 확인해야 했고, _"지금 이 스트리머가 방송 중인지"_ 한 화면에서 알 수 없었습니다.

**OnAir는 그 불편함을 해결합니다.** 피드를 보면서 어떤 스트리머가 지금 방송 중인지 실시간으로 확인하고, 바로 채널로 이동할 수 있습니다.

### 개발 방식

1인 개발 프로젝트입니다. 기획 · 디자인 · 프론트엔드 개발 · 인프라 설정 · 배포를 전담했습니다.

단순 CRUD 구현을 넘어 **실서비스 수준의 기술적 과제**를 스스로 정의하고 해결하는 것을 목표로 삼았습니다.

---

## 기술 스택

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery&logoColor=white&style=flat-square)
![Zustand](https://img.shields.io/badge/Zustand-v5-433D2B?style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white&style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=flat-square)

| 구분            | 기술                           | 선택 이유                                      |
| --------------- | ------------------------------ | ---------------------------------------------- |
| 프레임워크      | React 19 + TypeScript          | 컴포넌트 재사용성과 타입 안전성 확보           |
| 빌드            | Vite                           | 빠른 개발 서버 및 HMR                          |
| 스타일링        | Tailwind CSS v4 + shadcn/ui    | 디자인 시스템 일관성, 빠른 UI 구성             |
| 라우팅          | React Router v7                | 클라이언트 사이드 라우팅                       |
| 서버 상태       | TanStack Query v5              | 캐싱 · 낙관적 업데이트 · 무한 스크롤 통합 관리 |
| 클라이언트 상태 | Zustand v5                     | 경량 전역 상태, Context 대비 리렌더 최소화     |
| 인증            | Supabase Auth                  | Email · OAuth 통합 인증                        |
| 데이터베이스    | Supabase PostgreSQL + RLS      | 서버리스 DB + DB 레이어 권한 제어              |
| 서버리스        | Supabase Edge Functions (Deno) | CORS 없이 외부 API를 서버 사이드에서 중계      |
| 배포            | Vercel                         | 프론트엔드 최적화 배포 환경                    |

---

## 주요 기능

| 기능                  | 설명                                                                       |
| --------------------- | -------------------------------------------------------------------------- |
| 🔴 실시간 라이브 현황 | 인기 라이브 스트리머 TOP 10 사이드바 + 채널 태그 LIVE 배지 (1분 주기 갱신) |
| 📝 게시판             | 게시글 작성 · 수정 · 삭제, 이미지 · 영상 업로드, 캐러셀 미디어 뷰어        |
| ♾️ 무한 스크롤        | 최신순 · 인기순 피드, 스크롤 위치 복원                                     |
| ❤️ 좋아요             | 낙관적 업데이트로 즉각 반응, RPC 원자적 동시성 처리                        |
| 💬 댓글               | 댓글 · 대댓글 작성 · 수정 · 삭제                                           |
| 🔐 인증               | 이메일 · GitHub · Google OAuth 로그인, 비밀번호 재설정                     |
| 👤 프로필             | 프로필 이미지 · 닉네임 · 소개 수정, 사용자별 게시글 모아보기               |
| 🎨 테마               | 다크 · 라이트 · 시스템 테마 전환                                           |
| 📢 공지사항           | 최신 공지 배너 (헤더 상시 노출) + 공지 페이지                              |

---

## 시스템 아키텍처

```
┌─────────────────────────────────────────────────────┐
│                    React 19 (Vite)                  │
│                                                      │
│   Pages → Components → Hooks → API Layer            │
│                          │                          │
│            TanStack Query │ Zustand                  │
│            (서버 상태)    │ (UI 상태 — 모달·테마·세션) │
└──────────────────────────┼──────────────────────────┘
                           │
             ┌─────────────┴──────────────┐
             │          Supabase          │
             │                           │
      ┌──────┴──────┐    ┌───────────────┴──────┐
      │ PostgreSQL  │    │   Edge Functions      │
      │ + Auth      │    │   (Deno, 서버리스)    │
      │ + Storage   │    │                      │
      │ + RLS       │    │  chzzk-search        │
      └─────────────┘    │  chzzk-top-lives     │
                         │  chzzk-live          │
                         └──────────┬───────────┘
                                    │
                      ┌─────────────┴──────────────┐
                      │       치지직 API             │
                      │  공식 Open API (우선)        │
                      │  비공식 채널 API (폴백)      │
                      └────────────────────────────┘
```

---

## 핵심 구현 및 문제 해결

### 1. TanStack Query 캐시 정규화 — 목록·상세 중복 요청 제거

**문제** 무한 스크롤 목록 → 상세 페이지 이동 시마다 이미 받아온 데이터를 다시 fetch해 로딩 스피너가 불필요하게 노출됐습니다.

**해결** `useInfiniteQuery` 응답에서 개별 게시글 데이터를 `QUERY_KEYS.post.byId(id)` 키로 캐시에 동시에 세팅하는 정규화 구조를 적용했습니다. 상세 페이지는 `enabled: false`로 별도 요청을 막고 해당 캐시를 재사용합니다.

**결과** 목록 → 상세 이동 시 추가 네트워크 요청 없이 즉시 렌더링됩니다. 목록 복귀 시에도 스크롤 위치와 데이터가 캐시에서 복원됩니다.

---

### 2. 좋아요 낙관적 업데이트 + RPC 원자적 처리

**문제** 좋아요 클릭 후 서버 응답 대기 중 UI가 굳어 있고, 빠른 연속 클릭 시 좋아요 수가 불일치하는 동시성 문제가 있었습니다.

**해결** `onMutate`에서 캐시를 즉시 수정해 UI를 선반영하고, `onError`에서 이전 스냅샷으로 롤백합니다. DB 처리는 Supabase RPC(`toggle_post_like`)에 위임해 원자적 트랜잭션으로 처리했습니다.

**결과** 사용자 관점에서 좋아요가 즉각 반응하며, 연속 클릭에도 최종 상태는 항상 DB와 일치합니다.

---

### 3. Supabase Edge Function — 치지직 API CORS 해결

**문제** 브라우저에서 치지직 API를 직접 호출하면 CORS 정책에 의해 요청이 차단됩니다. 별도 백엔드 서버 없이 해결해야 했습니다.

**해결** 이미 Supabase를 사용하고 있어 추가 인프라 없이 Edge Function(Deno)을 서버 사이드 중계 레이어로 구성했습니다. 새 기능은 기존 함수를 파라미터로 확장하는 방식으로 함수 수를 최소화했습니다.

**결과** CORS 없이 라이브 여부 · 시청자 수 · 썸네일 실시간 데이터를 연동했습니다. 환경 변수도 Supabase 프로젝트 안에서 통합 관리됩니다.

---

### 4. 공식 Open API + 비공식 API 폴백 구조

**문제** 치지직 공식 Open API는 상위 N개 채널만 반환해 그 밖의 중소 스트리머는 항상 오프라인으로 잘못 표시됐습니다.

**해결** 공식 API를 우선 시도하되 대상 채널이 목록에 없으면 `null`을 반환해 채널 전용 비공식 API로 폴백합니다. 즉시 `{ status: "CLOSE" }`를 반환하던 로직을 `null` 반환으로 수정해 폴백이 실제로 동작하게 했습니다.

**결과** 규모와 무관하게 모든 채널의 라이브 여부를 정확하게 표시합니다.

---

### 5. Supabase RLS — DB 레이어 권한 제어

**문제** 프론트엔드에서 수정/삭제 버튼을 숨겨도 API를 직접 호출하면 타인의 게시글을 수정할 수 있는 보안 취약점이 있었습니다.

**해결** PostgreSQL RLS 정책으로 `auth.uid() = author_id` 조건을 DB 레이어에서 강제합니다. 별도 서버 없이 DB 자체가 권한을 검증합니다.

**결과** 프론트엔드 우회 시도에도 타인의 게시글 · 댓글 수정 · 삭제 요청이 DB에서 거부됩니다. 프론트엔드 UI 제어와 DB 정책이 이중으로 보호합니다.

---

## 결과 및 성과

- **실서비스 배포 운영**: Vercel을 통해 프로덕션 배포, 실제 접속 가능한 서비스로 운영 중
- **외부 API 실시간 연동**: 치지직 공식 Open API를 통해 라이브 스트리머 데이터를 1분 주기로 갱신
- **SEO 설정 완료**: Open Graph · Twitter Card · JSON-LD 구조화 데이터 · sitemap.xml · robots.txt 적용, Google Search Console 인증 완료
- **인증 3종 완전 구현**: 이메일 · GitHub · Google OAuth 로그인이 모두 동작하는 완전한 인증 플로우
- **보안 이중 방어**: 프론트엔드 UI 제어 + DB RLS 정책으로 권한 우회 원천 차단

---

## 배운점 / 향후 계획

### 배운점

- **서버 상태와 UI 상태를 분리**해야 한다는 것을 실감했습니다. TanStack Query와 Zustand를 역할에 따라 나누면서 각 상태의 수명 주기와 책임이 명확해졌습니다.
- **CORS는 프론트엔드 문제가 아닌 서버 설계 문제**임을 체감했습니다. Edge Function으로 해결하면서 서버리스 아키텍처의 활용 방식을 익혔습니다.
- **낙관적 업데이트**는 구현 복잡도 대비 체감 성능을 극적으로 개선하는 기법임을 확인했습니다.

### 향후 계획

- Supabase Realtime 구독 기반 실시간 댓글 알림
- 스트리머 채널별 전용 피드 페이지
- PWA 전환 및 모바일 푸시 알림

---

## 폴더 구조

```
src
├─ api/              # Supabase · Edge Function 호출
├─ components/
│  ├─ layout/        # 헤더 · 푸터 · 레이아웃
│  ├─ modal/         # 게시글 작성 · 프로필 편집 모달
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

---

## 실행 방법

```bash
npm install
npm run dev
```

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
```

---

## 공지사항

OnAir는 NAVER 치지직(CHZZK)과 공식 제휴 관계가 없는 팬 커뮤니티입니다.
