"use client";
//safe Wrapper Delays the framer-motion until browser is ready
import { motion, HTMLMotionProps } from "framer-motion";
import { HTMLAttributes } from "react";
import useHasMounted from "@/hooks/useHasMounted";

type motionDivProps = HTMLMotionProps<"div">;
type plainDivProps = HTMLAttributes<HTMLDivElement>;

export default function ClientMotion(props: motionDivProps) {
  const hasMounted = useHasMounted();

  // Destructure motion-specific props so they are not passed to plain div
  const { initial, animate, whileInView, viewport, transition, ...rest } =
    props;

  if (!hasMounted) {
    return <div {...(rest as plainDivProps)} />;
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      {...rest}
    />
  );
}
