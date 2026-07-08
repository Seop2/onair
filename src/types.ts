/**
 * supabase로 생성한 테이블 타입 정의
 */

import { type Database } from "./database.types";

export type CommentEntity = Database["public"]["Tables"]["comment"]["Row"];
export type NoticeEntity = Database["public"]["Tables"]["notice"]["Row"];
export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type Post = PostEntity & { author: ProfileEntity; isLiked: boolean }; //사용자 정보를 포함한 게시글
// 데이터 타입 정의
//인터섹션 타입 정의 (&)
//인터섹션 타입 : 여러 타입을 만족하는 하나의 타입
export type Comment = CommentEntity & { author: ProfileEntity }; //작성자 정보를 포함한(닉네암 둥) 타입임을 선언

export type NestedComment = Comment & {
  parentComment?: Comment;
  children: NestedComment[]; //재귀적인 타입 정의
};

export type useMutationCallback = {
  onSuccess?: () => void;
  onError: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export type Theme = "system" | "dark" | "light";
