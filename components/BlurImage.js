import React from "react";
import { useState } from "react";
import Image from "next/image";

function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href={image?.url} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={image.src.medium}
          layout="fill"
          objectFit="cover"
          className={`
            'group-hover:opacity-75 duration-700 ease-in-out'
            ${
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            }`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {image?.photographer}
      </p>
    </a>
  );
}

export default BlurImage;
