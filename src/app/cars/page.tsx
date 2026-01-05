import { Suspense } from "react";
import CarsClient from "./CarsClient";
import LoadingState from "@/components/sharedComponents/LoadingState";

export default function CarsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CarsClient />
    </Suspense>
  );
}
