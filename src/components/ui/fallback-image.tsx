"use client";
import React, { useState } from "react";

type FallbackImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
};

export default function FallbackImage({
  src,
  alt,
  className,
  fallbackText,
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [didFallback, setDidFallback] = useState(false);

  const handleError = () => {
    if (didFallback) return;
    const text = fallbackText || alt || "Image";
    const placeholder = `https://via.placeholder.com/300x400/8B5CF6/FFFFFF?text=${encodeURIComponent(
      text
    )}`;
    setImgSrc(placeholder);
    setDidFallback(true);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      draggable={false}
    />
  );
}