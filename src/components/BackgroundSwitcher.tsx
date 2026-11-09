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
      {
        url: "https://visitsolihull.co.uk/wp-content/uploads/2022/10/Halloween-1-2048x1365.jpg",
        label: "Halloween",
      },
      {
        url: "https://assets.artifactuprising.com/assets/campaigns/2021/01-17+Winter+Photo+Tips+BLOG/04-A-jan-kop%C3%85_iva.jpg",
        label: "Winter Portrait",
      },
      {
        url: "https://assets.artifactuprising.com/assets/campaigns/2020/Q1/01-23+Winter+Photo+Tips/Flo_Maderebner.jpg",
        label: "Skiers",
      },
      {
        url: "https://assets.artifactuprising.com/assets/campaigns/2021/01-17+Winter+Photo+Tips+BLOG/07.jpg",
        label: "Snow Trees",
      },
      {
        url: "https://assets.artifactuprising.com/assets/campaigns/2020/Q1/01-23+Winter+Photo+Tips/SnowyRoad.jpg",
        label: "Snowy Road",
      },
      {
        url: "https://hips.hearstapps.com/hmg-prod/images/christmas-living-room-67681e686534b.png?crop=1.00xw:0.742xh;0,0.0856xh&resize=1200:*",
        label: "Christmas Living Room",
      },
      {
        url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQpD0gu5jY_z2aSgE-zev7MccD-s55KHfDuCWnL0jjbi8U0OVlP",
        label: "Christmas Thumbnail",
      },
      {
        url: "https://wallpapercave.com/wp/wp14753521.jpg",
        label: "Christmas Wallpaper",
      },
      {
        url: "https://cdn.wallpapersafari.com/78/14/KdTYnE.jpg",
        label: "Winter Wallpaper",
      },
      {
        url: "https://media.wallpaperengine.space/posters/v1/snowy-mountain-cabin-northern-lights-christmas.webp",
        label: "Mountain Cabin Northern Lights",
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
      {/* Removed dark overlay to show the image as-is */}

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

      {/* Bottom-left external link button */}
      <div className="fixed left-4 bottom-4 z-10">
        <Button
          asChild
          size="lg"
          className="shadow-lg bg-black/70 text-white hover:bg-black/80 border border-white/20 backdrop-blur"
        >
          <a
            href="https://bingo-generator-ckhw.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Create bingo cards"
            title="Create bingo cards"
          >
            Create bingo cards
          </a>
        </Button>
      </div>
    </>
  );
}
