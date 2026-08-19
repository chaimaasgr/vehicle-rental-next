"use client";

import { useState } from "react";
import Image from "next/image";

export function VehicleGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl2 bg-asphalt-100 shadow-card">
        <Image
          src={images[selected]}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 560px, 90vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Voir la photo ${i + 1} de ${alt}`}
              aria-current={selected === i}
              className={`focus-ring relative aspect-[4/3] overflow-hidden rounded-xl bg-asphalt-100 ring-2 transition ${
                selected === i
                  ? "ring-signal-500"
                  : "ring-transparent hover:ring-asphalt-300"
              }`}
            >
              <Image
                src={img}
                alt={`${alt} — vue ${i + 1}`}
                fill
                sizes="180px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}