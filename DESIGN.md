---
omd: 0.1
brand: OnAir
bootstrapped_from: twitch
bootstrapped_at: 2026-07-07T00:00:00Z
---

# Design System — OnAir

## 1. Visual Theme & Atmosphere

OnAir는 치지직 시청자들이 방송 이야기를 나누는 커뮤니티 게시판이다. Twitch의 Core UI가 라이브 스트림을 둘러싼 고밀도 크롬으로 설계됐듯이, OnAir의 인터페이스는 **치지직 방송 이야기가 중심에 오도록** 설계한다 — 크롬은 조용하고, 콘텐츠가 빛난다.

기본 테마는 **다크 모드**다. 어두운 캔버스(`#171717`)와 한 단계 높은 카드 서피스(`#222222`)가 피드를 구성하고, 텍스트는 따뜻한 근-흰색(`#f8f8f8`)으로 레이어된다. 그 위에 단 하나의 채도 있는 색이 올라온다: **치지직 민트** (`#00ffa3`). 네이버 치지직의 브랜드 컬러를 계승한 이 민트는 글쓰기 CTA, 좋아요 활성, 방송 연결 링크 등 **"지금 방송 중"이라는 신호** 위에만 쓰인다.

타이포그래피는 **Pretendard** 단일 폰트 패밀리다. 헤더·UI 라벨·본문 모두 Pretendard로 처리하며, 14px / weight 400이 피드의 기본 밀도다. 버튼 레이블은 weight 600, 메타데이터(시청자 수, 게시 시각)는 12px caption 층을 형성한다.

**핵심 특징:**
- 치지직 민트 (`#00ffa3`) — 단일 액션 컬러; 글쓰기 CTA·좋아요 활성·방송 링크 한정
- 민트 ramp: 딥 민트 `#00cc82` → 포레스트 `#009962` → 다크 포레스트 `#005c3a`
- 다크 기본: 캔버스 `#171717`, 카드 `#222222`, 근-흰색 전경 `#f8f8f8`
- Pretendard 단독; 14px/400 피드, 12px 메타데이터 레이어
- 라이브 표시 `#ef4444` — 민트 이외의 유일한 신호 컬러
- 섀도 없음: 서피스 계층화 + 보더로 깊이 표현; 썸네일엔 scrim
- 전체 pill (9999px) 버튼 + 아바타; 기능 크롬은 6–10px

## 2. Color Palette & Roles

### Primary (Mint Ramp)
- **치지직 민트** (`#00ffa3`): 유일한 채도 있는 액션 컬러. 글쓰기 CTA, 좋아요 활성, 방송 연결 버튼.
- **딥 민트** (`#00cc82`): 링크와 활성 내비게이션 상태 — 민트보다 어둡고 가독성이 높은 단계.
- **포레스트 민트** (`#009962`): 호버 / 보조 강조.
- **다크 포레스트** (`#005c3a`): 가장 어두운 민트 서피스 — 눌린 상태, 딥 패널.

### Ink & Text (다크 모드)
- **근-흰색** (`#f8f8f8`): 기본 텍스트, 헤딩, 내비게이션 레이블.
- **뮤트 실버** (`#a3a3a3`): 보조 텍스트, 메타데이터.
- **딤 그레이** (`#6b7b74`): 비활성 레이블, 삼차 정보.

### Surface (다크 모드)
- **캔버스 다크** (`#171717`): 기본 페이지 배경.
- **카드 다크** (`#222222`): 카드, 사이드바, 팝오버 서피스.
- **엘리베이티드** (`#2a2a2a`): 눌린 카드, 드롭다운 서피스.

### Surface (라이트 모드)
- **캔버스 라이트** (`#ffffff`): 라이트 페이지 배경.
- **카드 라이트** (`#fafafa`): 라이트 카드 서피스.
- **잉크 라이트** (`#0a0a0a`): 라이트 기본 텍스트.
- **뮤트 라이트** (`#6b7280`): 라이트 보조 텍스트.
- **보더 라이트** (`#e5e7eb`): 라이트 구분선.

### Signal
- **LIVE 레드** (`#ef4444`): 독점적 라이브 중 표시기 — 다른 맥락에서 절대 사용 금지.
- **디스트럭티브** (`#f87171`): 오류, 경고 상태.

### Translucent (prose-only — alpha)
- **썸네일 스크림** (`rgba(0,0,0,0.6)`): 썸네일 위의 시청자 수·LIVE 오버레이.
- **보더 다크** (`rgba(255,255,255,0.10)`): 다크 모드 카드·헤더 구분선.
- **민트 링** (`rgba(0,255,163,0.40)`): 라이브 중 스트리머 아바타 강조 링.

### 색상 우선순위 규칙
- `#00ffa3` — 버튼·CTA·좋아요 활성 등 **주요 액션**에만 사용
- `#00cc82` — 채널명 텍스트·링크 레이블 등 **텍스트/링크** 표시에 사용
- 두 색을 같은 맥락에 혼용하지 않는다

### Auth 페이지
`/sign-in`, `/sign-up`, `/forget-password`는 `AuthLayout`으로 분리된 별도 레이아웃이지만, 이 DESIGN.md의 토큰 체계를 동일하게 따른다. 배경 `bg-background`, 카드 `bg-card`, 버튼 `#00ffa3` rounded-full, 인풋 10px radius, 로고 OnAir 텍스트(`#00ffa3`).

## 3. Typography Rules

### Font Family
- **Pretendard**: 디스플레이·UI 모두 담당. 한글 게시판이므로 영문·한글 가독성 모두 Pretendard Variable 하나로 처리.
  - CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| 브랜드 로고 | Pretendard | 18px | 800 | 1.0 | 헤더 OnAir 로고, 민트 컬러 |
| 섹션 헤딩 | Pretendard | 16px | 600 | 1.3 | 피드·사이드바 섹션 타이틀 |
| 바디 / UI | Pretendard | 14px | 400 | 1.5 | 게시글 본문, 피드 표준 텍스트 |
| 버튼 | Pretendard | 14px | 600 | 1.0 | 버튼 레이블 (SemiBold) |
| 캡션 | Pretendard | 12px | 400 | 1.2 | 게시 시각, 시청자 수, LIVE 배지 |

### Principles
- **Pretendard 단독**: 한글과 라틴 모두 Pretendard Variable로 처리 — 두 번째 폰트 없음.
- **14px 피드 밀도**: 게시글 리스트·메타데이터 모두 14px/400으로 정보 밀도 확보.
- **SemiBold는 액션과 섹션**: 버튼·섹션 헤딩만 600; 나머지 정보는 400.
- **12px 메타 레이어**: 게시 시각, 좋아요 수, LIVE 상태가 독립된 캡션 층을 구성.

## 4. Component Stylings

### Buttons

**글쓰기 / 회원가입 (Primary)**
- Background: `#00ffa3`
- Text: `#000000` (밝은 민트 위에 검정 텍스트)
- Radius: 9999px
- Height: 36px
- Font: 14px Pretendard weight 600
- Use: 주요 CTA — 글쓰기, 회원가입

**로그인 / 보조 (Secondary)**
- Text: foreground (`#f8f8f8` 다크 / `#0a0a0a` 라이트)
- Radius: 9999px
- Height: 36px
- Font: 14px Pretendard weight 600
- Background: 반투명 `rgba(255,255,255,0.08)` (다크) / `rgba(0,0,0,0.06)` (라이트)
- Use: 보조 액션 — 로그인, 취소

### Inputs & Forms

**검색 / 텍스트 필드**
- Background: card surface (`#222222` 다크 / `#ffffff` 라이트)
- Radius: 10px
- Padding: 0px 12px
- Height: 36px
- Font: 14px Pretendard weight 400
- Border: `rgba(255,255,255,0.10)` 1px (다크) / `#e5e7eb` 1px (라이트)
- Use: 스트리머 검색, 게시글 작성 입력

**텍스트에어리어 (게시글 작성)**
- Background: card surface
- Radius: 10px
- Padding: 12px
- Font: 14px Pretendard weight 400

### Cards & Containers

**게시글 카드**
- Background: `#222222` (다크) / `#ffffff` (라이트)
- Radius: 10px
- Border: `rgba(255,255,255,0.10)` 1px (다크) / `#e5e7eb` 1px (라이트)
- Shadow: none
- Use: 피드 게시글 아이템 — 섀도 없음, 보더로 구분

**스트리머 카드 (사이드바)**
- Background: card surface
- Radius: 10px
- Use: 라이브 스트리머 목록 타일; 아바타 + 채널명 + 시청자 수

### Badges

**LIVE 배지**
- Background: `#ef4444`
- Text: `#ffffff`
- Radius: 4px
- Padding: 1px 6px
- Font: 10px Pretendard weight 800
- Use: 라이브 중 표시 — 유일한 LIVE 레드 사용처

**채널 태그 / 필터 pill**
- Background: `rgba(0,255,163,0.10)`
- Text: `#00ffa3`
- Radius: 9999px
- Padding: 2px 10px
- Font: 12px Pretendard weight 500
- Use: 스트리머 필터, 채널 태그 표시

### Navigation
- Background: `#171717` (다크) / `#ffffff` (라이트)
- Border-bottom: `rgba(255,255,255,0.10)` (다크) / `#e5e7eb` (라이트)
- Logo 'OnAir': `#00ffa3` Pretendard 18px weight 800
- Nav link: foreground 14px/400, 활성 시 `#00ffa3`
- Use: 상단 헤더 — 로고·내비·프로필 버튼

### Avatars
- Radius: 9999px (full circle)
- Size: 40px (피드 카드) / 32px (사이드바)
- Ring (라이브 중): `rgba(0,255,163,0.40)` 2px solid — "지금 방송 중" 신호

---

**Bootstrapped:** 2026-07-07 (omd:init, inspired by twitch reference)

## 5. Layout Principles

### Spacing System
- Base unit: 4px
- Scale: 4px, 8px, 12px, 16px, 24px, 32px, 40px
- 피드 카드 간격: 12–16px (밀도 우선)
- 섹션·컨테이너 여백: 24–40px

### Grid & Container
- 최대 너비: 1100px 센터 정렬
- 메인 레이아웃: 피드 영역 (flex-1, min-w-0) + 우측 라이브 사이드바 (lg 이상만 노출)
- 상단 라이브 바: 가로 스크롤 스트리머 썸네일 행
- 게시글 피드: 단일 컬럼 카드 리스트

### Whitespace Philosophy
- **피드 밀도 우선**: 게시글 카드 사이 간격은 12–16px — 정보를 조밀하게, 여백은 기능적으로.
- **라이브가 히어로**: 상단 라이브 바와 채널 배너가 방송 신호를 가장 먼저 전달한다.
- **크롬은 침묵**: 내비·카드 보더·메타데이터는 민트가 빛날 공간을 만들기 위해 조용하게 후퇴.

### Border Radius Scale
- Micro (4px): LIVE 배지, 배지형 내부 요소
- Small (6px): 채널 필터 pill, 작은 태그
- Medium (10px): 카드, 인풋, 모달 — 현재 CSS `--radius: 0.625rem` 과 정합
- Full (9999px): 버튼, 아바타, round pill

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | 배경, 내비, 카드, 버튼 전반 |
| Scrim (Level 1) | `rgba(0,0,0,0.6)` overlay | 썸네일 위 시청자 수 pill |
| Border (Level 2) | `rgba(255,255,255,0.10)` | 다크 모드 카드·헤더 구분선 |
| Ring (Level 3) | `rgba(0,255,163,0.40) 0 0 0 2px` | 라이브 스트리머 아바타 강조 링 |

**Shadow Philosophy**: OnAir는 섀도리스 시스템이다 — 카드·버튼·헤더 전반에 `box-shadow: none`. 다크 서피스의 계층화 (`#171717` → `#222222` → `#2a2a2a`)가 깊이를 만들고, 민트 링과 LIVE 레드가 강조를 담당한다. 섀도를 추가하면 어두운 배경에서 노이즈가 되고 라이브 썸네일의 시각적 우선순위가 흐트러진다.

## 7. Do's and Don'ts

### Do
- 치지직 민트 (`#00ffa3`)를 주요 액션 하나에만 — 글쓰기 CTA, 좋아요 활성, 방송 연결 링크
- 민트 ramp로 인터랙션 계층화: 링크 `#00cc82` → 호버 `#009962` → 딥 `#005c3a`
- 다크 모드를 기본값으로: `#171717` 캔버스, `#222222` 카드, `#f8f8f8` 전경
- 섀도 없이 서피스 계층화와 보더로 깊이 표현
- LIVE 레드 (`#ef4444`)는 라이브 중 표시에만 — 다른 오류나 강조에 재사용 금지
- 라이브 스트리머 아바타에 민트 링 — "지금 방송 중" 시각 신호
- 전체 pill (9999px) 버튼과 아바타; 기능 크롬은 6–10px

### Don't
- 민트를 여러 요소에 흩뿌리기 — 단일 액션 신호가 희석됨
- 그림자로 카드 강조 — 다크 배경에서 노이즈, 라이브 썸네일과 경쟁
- 라이트 모드를 기본 디자인 기준으로 삼기 — 다크가 주 사용 환경
- LIVE 레드를 일반 버튼이나 링크에 사용
- 두 번째 브랜드 컬러 도입 — 민트 하나가 정체성
- 버튼이나 아바타에 날카로운 직각 코너 — 전체 pill이 원칙
- 피드 카드 크롬을 과하게 꾸미기 — 게시글 텍스트와 스트리머 썸네일이 주역

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | 사이드바 숨김; 단일 컬럼 피드; 라이브 바 가로 스크롤; 필터 세로 스택 |
| Tablet | 640–1024px | 피드 넓어짐; 사이드바 아직 숨김; 필터 가로 정렬 |
| Desktop | ≥1024px | 피드 + 우측 라이브 스트리머 사이드바 (`hidden lg:block`) |

### Touch Targets
- 버튼 최소 높이 36px, full pill, 쉽게 탭 가능
- 게시글 카드 전체 영역 클릭 가능
- 아바타 최소 32px × 32px

### Collapsing Strategy
- 우측 사이드바: ≥1024px에서만 노출 — 모바일·태블릿 숨김
- 상단 라이브 바: 모든 크기에서 가로 스크롤 유지
- 게시글 필터 + 정렬: <640px에서 세로 스택, ≥640px에서 가로 `space-between`

### Image Behavior
- 스트리머 썸네일: 섀도 없음; LIVE·시청자 수 pill은 `rgba(0,0,0,0.6)` scrim 오버레이
- 아바타: 모든 크기에서 full circle (9999px) 유지

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: 치지직 민트 (`#00ffa3`), text `#000000`
- Link / active: 딥 민트 (`#00cc82`)
- Hover: 포레스트 민트 (`#009962`)
- Deep surface: 다크 포레스트 (`#005c3a`)
- 기본 텍스트 (다크): `#f8f8f8`
- 보조 텍스트 (다크): `#a3a3a3`
- 캔버스 (다크): `#171717`; 카드 (다크): `#222222`
- LIVE 신호: `#ef4444`
- 보더 (다크): `rgba(255,255,255,0.10)`
- 아바타 라이브 링: `rgba(0,255,163,0.40)`

### Example Component Prompts
- "다크 배경(`#171717`)에 상단 헤더. 로고 'OnAir'는 `#00ffa3` Pretendard 18px/800. 오른쪽: 로그인 pill(반투명 `rgba(255,255,255,0.08)` fill, `#f8f8f8` text, 9999px, 36px)과 글쓰기 pill(`#00ffa3` bg, `#000000` text, 14px/600, 9999px, 36px). 하단 `rgba(255,255,255,0.10)` 1px 보더."
- "게시글 카드: `#222222` bg, 10px radius, 섀도 없음, `rgba(255,255,255,0.10)` 1px 보더. 스트리머 아바타 40px(9999px); 라이브 중이면 `rgba(0,255,163,0.40)` 2px 링. 채널명 `#00cc82` 12px/500, 제목 `#f8f8f8` 14px/400, 시각·좋아요 수 `#a3a3a3` 12px/400."
- "LIVE 배지: `#ef4444` bg, white text, 4px radius, 1px 6px padding, 10px Pretendard 800."
- "스트리머 필터 pill: `rgba(0,255,163,0.10)` bg, `#00ffa3` text, 9999px radius, 2px 10px padding, 12px/500."

### Iteration Guide
1. 치지직 민트 (`#00ffa3`)는 단일 액션 컬러 — 분산 금지
2. 인터랙션은 민트 ramp: `#00cc82` 링크 → `#009962` 호버 → `#005c3a` 딥
3. Pretendard 14px/400 피드 UI — 단독 폰트
4. 섀도 없음 — `#171717` → `#222222` 서피스 계층화 + 보더로 깊이
5. 전체 pill(9999px) 버튼·아바타; 6–10px 기능 크롬
6. 텍스트는 `#f8f8f8` (다크) — 순수 흰색 남용 자제
7. LIVE 레드 `#ef4444`는 라이브 전용 — 다른 용도 절대 재사용 금지
8. 크롬은 침묵 — 방송 이야기와 스트리머 썸네일이 주역

---

## 10. Voice & Tone

OnAir의 목소리는 **팬-네이티브하고, 시청자 중심이며, 방송의 현장감을 담는다** — 치지직 커뮤니티가 이미 쓰는 언어로 말하되, 외부인을 배제하지 않는다. 스트리머와 팬을 "유저"가 아니라 함께 방송을 즐기는 참여자로 대한다.

| 맥락 | 톤 |
|---|---|
| 주요 CTA | 직접적이고 진입 장벽 없음. "글쓰기", "로그인", "팔로우", "방송 보기". |
| 피드 / 메타데이터 | 간결하고 사실적. "LIVE", "좋아요 123", "방금 전". |
| 빈 상태 / 온보딩 | 초대하는 어조. "아직 게시글이 없어요. 첫 번째로 이야기를 시작해볼까요?" |
| 오류 / 안내 | 명확하고 다음 행동을 알려줌. "로그인이 필요한 기능이에요." |
| 커뮤니티 문화 | 치지직 용어에 친숙하고 자연스럽게 녹인다. |

**금지 등록**: 딱딱한 기업체 말투(`~합니다`를 UI에 과도 사용), 방송 현장감을 무시한 정제된 홍보 문구, 유저를 가르치려는 어조.

## 11. Brand Narrative

OnAir는 **치지직 시청자들이 방송 관련 이야기를 나누는 공간**이다. 치지직(Chzzk)이 네이버의 라이브 스트리밍 플랫폼으로 성장하면서, 방송을 함께 보고 이야기하고 싶은 팬들의 니즈가 생겨났다 — OnAir는 그 공간을 채운다.

OnAir가 거부하는 것: 방송 콘텐츠 없이 존재하는 SNS 크롬, 스트리머를 소비 대상으로만 취급하는 인터페이스, 라이브 현장감을 희석하는 과도한 디자인 장치.

OnAir가 추구하는 것: 지금 방송 중인 스트리머의 이야기가 가장 먼저 보이는 피드, 팬들이 자연스럽게 이야기를 이어갈 수 있는 게시판, 치지직의 민트 컬러로 연결된 통일감.

## 12. Principles

1. **라이브 순간이 곧 서비스다.** 지금 방송 중인 스트리머와 그 이야기가 UI의 최우선 순위다. *UI implication:* LIVE 배지와 시청자 수를 즉시 노출; 상단 라이브 바가 항상 첫 번째 시각 요소.
2. **민트 하나, 깊이는 ramp로.** `#00ffa3`는 앵커; 인터랙션은 `#00cc82` → `#009962` → `#005c3a`로 내려간다. *UI implication:* 민트를 단일 액션에만 쓰고, 나머지 강조는 ramp의 단계로.
3. **팬 네이티브 밀도.** 치지직 팬은 게시글·좋아요·채널 필터를 한 화면에서 소화한다. *UI implication:* 14px 기본 타입 스케일, 카드 간격 12–16px — 밀도는 설계된 것.
4. **크롬은 방송 이야기에 길을 비워준다.** 내비·카드 보더·메타데이터는 조용하고 간결하다. *UI implication:* 섀도 없음, 서피스 계층화, 민트는 진짜 액션에만.
5. **스트리머와 팬의 정체성을 담는다.** 아바타 민트 링, 채널 태그 pill, 스트리머 썸네일이 개인 커뮤니티 느낌을 만든다.

## 13. Personas

*다음 페르소나는 OnAir 예상 사용자 유형을 기반으로 한 가상 인물이다.*

**김지호, 22, 대학생.** 치지직에서 여러 스트리머를 구독하고 매일 방송을 본다. 방송 중 일어난 재미있는 장면이나 화제를 공유하고 싶을 때 OnAir를 찾는다. 게시글 작성보다 좋아요·댓글이 빠른 리액션 수단. 다크 모드만 사용.

**이수연, 27, 직장인.** 퇴근 후 치지직 스트리머 방송과 클립을 챙겨 본다. 특정 스트리머 팬으로서 그 채널 관련 글만 모아 보는 필터를 자주 활용. 모바일 세로 방향으로 주로 접속.

**박현우, 19, 고등학생.** 치지직 게임 스트리머 팬. 라이브 중 방송을 보면서 동시에 OnAir에 게시글을 올리는 다중 화면 유저. 빠른 게시·빠른 반응이 핵심 니즈.

## 14. States

| State | Treatment |
|---|---|
| **Empty (게시글 없음)** | 카드 배경 (`#222222`). 뮤트 실버 안내 텍스트, 민트 CTA("첫 게시글 작성하기"). 일러스트 없이 심플하게. |
| **Empty (검색 결과 없음)** | 뮤트 실버 한 줄로 결과 없음 + 검색어 반복 표시. 조용하고 사실적. |
| **Loading (피드 카드)** | `#2a2a2a` 스켈레톤 블록, 10px radius, 섀도 없는 flat pulse. 카드 최종 크기와 동일. |
| **Loading (스트리머 썸네일)** | 동일 스켈레톤, 16:9 비율 유지. |
| **Error (네트워크 오류)** | 카드 보더 `rgba(239,68,68,0.30)` + 간단한 오류 텍스트 + "다시 시도" 민트 링크. 죽은 화면 없이. |
| **Error (폼 유효성)** | 인풋 하단에 오류 메시지 — 뭐가 문제인지 구체적으로. |
| **Success (좋아요 / 게시)** | 인라인 즉시 확인; 좋아요 아이콘 민트로 채워짐. 블로킹 모달 없음 — 액션은 즉각적. |
| **Skeleton** | `#2a2a2a` 블록, 10px radius, flat pulse. |
| **Disabled** | 감소된 opacity(40%); 민트 버튼은 fade로 — 회색 전환이 아닌 민트 유지. |

## 15. Motion & Easing

**Durations**:

| Token | Value | Use |
|---|---|---|
| `motion-fast` | 120ms | 호버, 버튼 press, 좋아요 토글 |
| `motion-standard` | 200ms | 드롭다운, 모달 열기, 카드 hover |
| `motion-slow` | 320ms | 페이지 전환, 테마 스위치 |

**Easings**:

| Token | Curve | Use |
|---|---|---|
| `ease-enter` | `cubic-bezier(0.2, 0.6, 0.25, 1)` | 등장 — 드롭다운, 패널, 카드 |
| `ease-exit` | `cubic-bezier(0.4, 0.0, 1, 1)` | 퇴장 |
| `ease-standard` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | 양방향 전환 |

**Motion rules**: OnAir의 모션은 기능적이고 빠르다 — 라이브 이야기의 속도를 방해하지 않는다. 호버와 press는 `motion-fast`; 드롭다운·모달은 `motion-standard / ease-enter`로 등장. 좋아요 토글은 즉각적 flip + 짧은 scale pulse. LIVE 배지 pulse 같은 표현 모션은 썸네일 레이어에만 — 피드 크롬과 충돌하지 않도록. `prefers-reduced-motion: reduce` 시 모든 트랜지션 즉시; 기능 유지.
