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

export function SvgCopy() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3333 7.5H16.6667C17.1269 7.5 17.5 7.8731 17.5 8.33333V16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H8.33333C7.8731 17.5 7.5 17.1269 7.5 16.6667V13.3333M13.3333 7.5V3.33333C13.3333 2.8731 12.9602 2.5 12.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V11.6667C2.5 12.1269 2.8731 12.5 3.33333 12.5H7.5M13.3333 7.5H12.5C11.1193 7.5 10 8.61929 10 10V12.5H7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SvgDisconnect() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 17.5H4.16667C3.70643 17.5 3.33333 17.1269 3.33333 16.6667V3.33333C3.33333 2.8731 3.70643 2.5 4.16667 2.5H7.5M13.3333 14.1667L16.6667 10.8333M16.6667 10.8333L13.3333 7.5M16.6667 10.8333H7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
