/**
 * Supabase Edge Function: chzzk-live
 *
 * 개별 채널의 라이브 상태를 조회합니다.
 * 공식 Open API를 우선 사용하며, 공식 API에서 조회되지 않을 경우
 * 비공식 API를 폴백으로 사용합니다.
 *
 * 배포: supabase functions deploy chzzk-live --no-verify-jwt
 */
import { corsHeaders } from "../cors.ts";

// deno-lint-ignore no-explicit-any
type AnyRecord = Record<string, any>;

async function fetchLiveViaOpenApi(
  channelId: string,
  clientId: string,
  clientSecret: string,
): Promise<AnyRecord | null> {
  // 공식 API의 라이브 목록(최대 20개)에서 해당 채널 존재 여부 확인
  const livesRes = await fetch(`https://openapi.chzzk.naver.com/open/v1/lives?size=100`, {
    headers: {
      "Client-Id": clientId,
      "Client-Secret": clientSecret,
      "Content-Type": "application/json",
    },
  });
  if (!livesRes.ok) return null;

  const livesJson = await livesRes.json();
  const lives: AnyRecord[] = livesJson?.content?.data ?? [];
  const found = lives.find((l: AnyRecord) => l.channelId === channelId);
  if (!found) return null;

  return {
    status: "OPEN",
    liveTitle: found.liveTitle ?? null,
    concurrentUserCount: found.concurrentUserCount ?? 0,
    liveImageUrl: found.liveThumbnailImageUrl ?? null,
  };
}

async function fetchLiveFallback(channelId: string): Promise<AnyRecord | null> {
  const res = await fetch(
    `https://api.chzzk.naver.com/service/v2/channels/${channelId}/live-detail`,
    {
      method: "GET",
      headers: {
        "User-Agent": "OnAir-Community/1.0",
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) return null;
  return await res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const respond = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status,
    });

  try {
    const url = new URL(req.url);
    const channelId = url.searchParams.get("channelId");

    if (!channelId) {
      return respond({ error: "channelId is required" }, 400);
    }

    const clientId = Deno.env.get("CHZZK_CLIENT_ID") ?? "";
    const clientSecret = Deno.env.get("CHZZK_CLIENT_SECRET") ?? "";

    // 공식 API 우선 시도
    if (clientId && clientSecret) {
      const official = await fetchLiveViaOpenApi(channelId, clientId, clientSecret);
      if (official !== null) {
        return respond({ content: official });
      }
    }

    // 폴백: 비공식 API
    const fallback = await fetchLiveFallback(channelId);
    return respond(fallback ?? { content: null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return respond({ error: message }, 400);
  }
});
