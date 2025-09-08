import { SVGProps } from 'react';

const WalletSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={21} height={20} fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.889 12.896H15.84a3.446 3.446 0 0 1-3.442-3.44 3.447 3.447 0 0 1 3.442-3.442h4.048a.75.75 0 0 1 0 1.5H15.84a1.945 1.945 0 0 0-1.942 1.942c0 1.069.872 1.94 1.942 1.94h4.048a.75.75 0 0 1 0 1.5Z"
      fill="#002B79"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.298 10.144h-.312a.75.75 0 0 1 0-1.5h.312a.75.75 0 0 1 0 1.5Z"
      fill="#002B79"
    />
    <mask
      id="a"
      style={{
        maskType: 'luminance',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={21}
      height={20}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0h20.639v19.173H0V0Z" fill="#fff" />
    </mask>
    <g mask="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.998 1.5A4.503 4.503 0 0 0 1.5 5.998v7.177a4.503 4.503 0 0 0 4.498 4.498h8.643a4.503 4.503 0 0 0 4.498-4.498V5.998A4.503 4.503 0 0 0 14.642 1.5H5.998Zm8.643 17.673H5.998A6.005 6.005 0 0 1 0 13.175V5.998A6.005 6.005 0 0 1 5.998 0h8.643a6.004 6.004 0 0 1 5.998 5.998v7.177a6.004 6.004 0 0 1-5.997 5.998Z"
        fill="#002B79"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.685 6.038h-5.4a.75.75 0 0 1 0-1.5h5.4a.75.75 0 0 1 0 1.5Z"
      fill="#002B79"
    />
  </svg>
);

export default WalletSvg;
