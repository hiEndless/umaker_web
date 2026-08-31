"use client";

import { useId } from "react";

type BrandLogoProps = {
  size?: "nav" | "footer";
};

export function BrandLogo({ size = "nav" }: BrandLogoProps) {
  const gradientId = useId();
  const symbolClass = size === "footer" ? "h-11 w-11" : "h-8 w-8";
  const wordmarkClass = size === "footer" ? "text-[2rem]" : "text-3xl";

  return (
    <span className="inline-flex items-center gap-3 leading-none">
      <svg
        viewBox="150 150 700 700"
        aria-hidden="true"
        className={`${symbolClass} overflow-visible`}
      >
        <defs>
          <linearGradient id={gradientId} x1="184" y1="812" x2="812" y2="184" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2563EB" />
            <stop offset="0.52" stopColor="#22D3EE" />
            <stop offset="1" stopColor="#60A5FA" />
          </linearGradient>
        </defs>

        <g stroke={`url(#${gradientId})`} strokeLinecap="square" strokeLinejoin="miter">
          <path d="M184 344V184H636" strokeWidth="28" />
          <path d="M812 274V398" strokeWidth="28" />
          <path d="M812 632V812H322" strokeWidth="28" />
          <path d="M184 618V758" strokeWidth="28" />
        </g>

        <g stroke={`url(#${gradientId})`} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round">
          <path d="M258 496L340 642" />
          <path d="M340 642L270 786" />
          <path d="M340 642L548 590" />
          <path d="M548 590L718 514" />
          <path d="M413 365L640 323" />
          <path d="M640 323L718 514" />
          <path d="M640 323L732 200" />
        </g>

        <circle cx="228" cy="448" r="64" fill={`url(#${gradientId})`} />
        <circle cx="402" cy="365" r="46" fill={`url(#${gradientId})`} />
        <circle cx="552" cy="590" r="50" fill={`url(#${gradientId})`} />
        <circle cx="729" cy="514" r="64" fill={`url(#${gradientId})`} />
        <circle cx="270" cy="786" r="36" fill={`url(#${gradientId})`} />
        <circle cx="732" cy="200" r="40" fill={`url(#${gradientId})`} />
        <circle cx="640" cy="323" r="12" fill={`url(#${gradientId})`} opacity="0.92" />
      </svg>

      <span className={`font-display ${wordmarkClass} tracking-[0.16em] text-[#f2ede6]`}>
        UMAKER
      </span>
    </span>
  );
}
