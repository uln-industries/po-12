import type { SVGProps } from "react";

const Metronome = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle
      cx="2.5"
      cy="2.5"
      r="2.5"
      transform="matrix(1 0 -0.00128082 0.999999 17.0064 5)"
      fill="currentColor"
    />
    <path
      d="M11 2C11.5 2 11.782 2 11.782 2H13C14.703 5.93732 17.3609 12.0821 17.3609 12.0821C16.8448 12.3877 16.1365 13.1139 15.7895 13.5763L11.9227 4.94425C11.8871 4.86168 11.9535 4.94425 11.8557 4.94425C11.7578 4.94425 11.9583 4.86168 11.9227 4.94425L9.15789 11.7204L6.31579 18.6801H17.6842L15.7895 13.5763L16.6846 12.1565C16.916 12.1482 17.1384 12.1234 17.3609 12.0821L21 21H3L11 2Z"
      fill="currentColor"
    />
    <line x1="19.8725" y1="7.4886" x2="12.8725" y2="19.9886" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default Metronome;
