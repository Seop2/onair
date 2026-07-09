import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

interface PostMediaCarouselProps {
  mediaUrls: string[];
  type: "FEED" | "DETAIL";
}

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];

function isVideoFile(url: string) {
  return VIDEO_EXTENSIONS.some((ext) => url.toLowerCase().endsWith(ext));
}

/** 게시글 첨부 이미지/동영상을 캐러셀로 표시 (피드: 자동재생, 상세: 컨트롤 표시) */
export default function PostMediaCarousel({
  mediaUrls,
  type,
}: PostMediaCarouselProps) {
  if (!mediaUrls.length) return null;

  return (
    <Carousel>
      <CarouselContent>
        {mediaUrls.map((url, index) => (
          <CarouselItem key={`${url}-${index}`} className="basis-3/5">
            <div className="bg-muted flex aspect-video items-center justify-center overflow-hidden rounded-lg">
              {isVideoFile(url) ? (
                <video
                  src={url}
                  controls={type === "DETAIL"}
                  autoPlay={type === "FEED"}
                  muted
                  loop
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={url}
                  alt="게시글 미디어"
                  className="h-full max-h-[350px] w-full object-cover"
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
