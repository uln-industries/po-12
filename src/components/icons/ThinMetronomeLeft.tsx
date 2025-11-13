import type { SVGProps } from "react";

const ThinMetronomeLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse cx="12" cy="21.5" rx="2" ry="1.5" fill="currentColor" />
    <path d="M14 2H10L7.5 12L6.5 16L5 22H19L14 2Z" stroke="currentColor" />
    <rect x="8" y="15" width="3.58072" height="2.27562" transform="rotate(102.563 8 15)" fill="#D9D9D9" />
    <rect x="10" y="22.5" width="4" height="1" fill="#D9D9D9" />
    <path d="M10.5413 19.5519L5.08467 15" stroke="currentColor" />
    <circle cx="4.5" cy="14.5" r="1.5" fill="currentColor" />
  </svg>
);

export default ThinMetronomeLeft;
