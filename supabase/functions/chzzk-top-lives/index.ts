/**
 * Supabase Edge Function: chzzk-top-lives
 *
 * 치지직 공식 Open API (openapi.chzzk.naver.com/open/v1/lives) 기반
 * 시청자 수 기준 top N 라이브 채널 반환
 *
 * 환경변수:
 *   CHZZK_CLIENT_ID     치지직 Open API 클라이언트 ID
 *   CHZZK_CLIENT_SECRET 치지직 Open API 클라이언트 시크릿
 *
 * 배포: supabase functions deploy chzzk-top-lives --no-verify-jwt
 */
import { corsHeaders } from "../cors.ts";

// deno-lint-ignore no-explicit-any
type AnyRecord = Record<string, any>;

async function fetchViaOpenApi(clientId: string, clientSecret: string, size: number): Promise<AnyRecord[]> {
  const res = await fetch(`https://openapi.chzzk.naver.com/open/v1/lives?size=${size}`, {
    headers: {
      "Client-Id": clientId,
      "Client-Secret": clientSecret,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return [];
  const json = await res.json();
  const list = json?.content?.data;
  if (!Array.isArray(list) || list.length === 0) return [];
  return list
    .filter((live: AnyRecord) => live.channelId)
    .map((live: AnyRecord) => ({
      channelId: live.channelId ?? "",
      channelName: live.channelName ?? "",
      channelImageUrl: live.channelImageUrl ?? null,
      concurrentUserCount: live.concurrentUserCount ?? 0,
      liveTitle: live.liveTitle ?? null,
      liveThumbnailUrl: live.liveThumbnailImageUrl ?? null,
    }));
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const ok = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    let topN = 10;
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      topN = Number(body?.size ?? 10);
    } else {
      topN = Number(new URL(req.url).searchParams.get("size") ?? 10);
    }

    const clientId = Deno.env.get("CHZZK_CLIENT_ID") ?? "";
    const clientSecret = Deno.env.get("CHZZK_CLIENT_SECRET") ?? "";

    if (!clientId || !clientSecret) {
      return ok({ data: [] });
    }

    const data = await fetchViaOpenApi(clientId, clientSecret, topN);
    return ok({ data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return ok({ error: message, data: [] }, 500);
  }
});
