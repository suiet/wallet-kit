import * as React from "react";

export function SvgArrowLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8332 10.0003H4.1665M4.1665 10.0003L9.99984 15.8337M4.1665 10.0003L9.99984 4.16699"
        stroke="currentColor" // currentColor is neccessary for the color to be inherited
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SvgClose() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="currentColor" // currentColor is neccessary for the color to be inherited
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SvgArrowDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1790_28273)">
        <path
          d="M9.99989 10.9766L14.1249 6.85156L15.3032 8.0299L9.99989 13.3332L4.69656 8.0299L5.87489 6.85156L9.99989 10.9766Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1790_28273">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(20) rotate(90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
