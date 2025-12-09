"use client";

import { useEffect, useState } from "react";

/**
 * Hook that returns true after the component has mounted on the client.
 * Use this to avoid SSR/hydration issues with Framer Motion initial animations.
 */
export default function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
