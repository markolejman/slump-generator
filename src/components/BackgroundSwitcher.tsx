"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type BackgroundOption = {
  url: string;
  label: string;
};

export default function BackgroundSwitcher() {
  // Define the backgrounds: keep current first, then user-provided ones
  const backgrounds: BackgroundOption[] = useMemo(
    () => [
      {
        url: "https://via.tt.se/data/images/00037/2a1c7bfb-56a9-4fd1-b06a-205833975e49.jpg",
        label: "Space Station",
      },
      {
        url: "https://m.media-amazon.com/images/I/71Z1DAFYA4L.jpg",
        label: "Nebula",
      },
      {
        url: "https://images6.alphacoders.com/552/thumb-1920-552086.jpg",
        label: "Galactic",
      },
      {
        url: "https://images.pexels.com/photos/597909/pexels-photo-597909.jpeg",
        label: "Aurora",
      },
    ],
    []
  );

  const [index, setIndex] = useState<number>(0);

  const next = () => setIndex((i) => (i + 1) % backgrounds.length);

  const current = backgrounds[index];

  return (
    <>
      {/* Background layer */}
      <div
        className="fixed inset-0 -z-10 transition-[background-image] duration-500 ease-in-out"
        style={{
          backgroundImage: `url('${current.url}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 -z-10 bg-black/60" aria-hidden />

      {/* Floating control button bottom-right */}
      <div className="fixed right-4 bottom-4 z-10">
        <Button
          type="button"
          size="lg"
          className="shadow-lg bg-black/70 text-white hover:bg-black/80 border border-white/20 backdrop-blur"
          onClick={next}
          aria-label="Change background"
          title={`Background: ${current.label} (click to change)`}
        >
          Change mood
        </Button>
      </div>
    </>
  );
}
