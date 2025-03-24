import { Suspense } from "react";
import HomeRenoClient from "./HomeRenoClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeRenoClient />
    </Suspense>
  );
}
