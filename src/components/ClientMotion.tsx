"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";

type DivProps = HTMLMotionProps<"div"> & { children?: React.ReactNode };

export default function ClientMotion(props: DivProps) {
  const hasMounted = useHasMounted();

  // Destructure motion-specific props so they are not passed to plain div
  const { initial, animate, whileInView, viewport, transition, ...rest } =
    props as any;

  if (!hasMounted) {
    return <div {...(rest as any)}>{props.children}</div>;
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      {...(rest as any)}
    >
      {props.children}
    </motion.div>
  );
}
