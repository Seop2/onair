import { useQuery } from "@tanstack/react-query";
import { fetchNotices, fetchLatestNotice } from "@/api/notice";
import { QUERY_KEYS } from "@/lib/constants";

export function useNoticeListData() {
  return useQuery({
    queryKey: QUERY_KEYS.notice.list,
    queryFn: fetchNotices,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLatestNotice() {
  return useQuery({
    queryKey: QUERY_KEYS.notice.latest,
    queryFn: fetchLatestNotice,
    staleTime: 1000 * 60 * 10,
  });
}
