-- 공지사항 테이블 생성
CREATE TABLE IF NOT EXISTS public.notice (
  id        BIGSERIAL PRIMARY KEY,
  title     TEXT      NOT NULL,
  content   TEXT      NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS 활성화
ALTER TABLE public.notice ENABLE ROW LEVEL SECURITY;

-- 모든 사용자 읽기 허용
CREATE POLICY "Anyone can read notices"
  ON public.notice FOR SELECT
  USING (true);

-- 샘플 공지 삽입
INSERT INTO public.notice (title, content) VALUES
  ('OnAir 커뮤니티 오픈 안내', '치지직 라이브 게시판 OnAir가 오픈했습니다! 좋아하는 스트리머 이야기를 함께 나눠보세요. 욕설, 비방, 도배 등의 게시글은 제재될 수 있습니다.'),
  ('게시판 이용 규칙 안내', '서로를 존중하는 건강한 소통 문화를 위해 이용 규칙을 확인해 주세요. 스트리머 관련 이야기에는 채널 태그를 달아주시면 더 많은 팬들이 볼 수 있습니다.');
