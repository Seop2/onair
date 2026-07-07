import type { ReactNode } from "react";
import { motion } from "framer-motion";

/** 스크롤 진입 시 페이드인 + 슬라이드업 애니메이션을 적용하는 래퍼 컴포넌트 */
export default function ScrollAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        y: { duration: 1 },
      }}
    >
      <div>{children}</div>
    </motion.div>
  );
}
