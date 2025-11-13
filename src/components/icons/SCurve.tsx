import type { SVGProps } from "react";

const SCurve = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M4 11.5263V17C4 19.2091 5.79086 21 8 21V21C10.2091 21 12 19.2091 12 17V10V7C12 4.79086 13.7909 3 16 3V3C18.2091 3 20 4.79105 20 7.00019C20 7.32754 20 7.64431 20 7.93629C20 9.86403 20 12.4737 20 12.4737"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default SCurve;
