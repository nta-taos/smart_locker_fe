import { SVGProps } from 'react';

const LocationSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={23} height={27} fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.334 9.333A2.336 2.336 0 0 0 9 11.668 2.335 2.335 0 0 0 11.334 14a2.335 2.335 0 0 0 2.333-2.332 2.336 2.336 0 0 0-2.333-2.335m0 6.667A4.337 4.337 0 0 1 7 11.668a4.339 4.339 0 0 1 4.334-4.335 4.339 4.339 0 0 1 4.333 4.335A4.337 4.337 0 0 1 11.334 16"
      fill="#074CE7"
    />
    <mask
      id="a"
      style={{
        maskType: 'luminance',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={23}
      height={27}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M.333.667h22v26h-22v-26Z" fill="#fff" />
    </mask>
    <g mask="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.332 2.667c-4.962 0-9 4.076-9 9.084 0 6.372 7.5 12.58 9 12.91 1.502-.331 9-6.54 9-12.91 0-5.008-4.037-9.084-9-9.084Zm0 24c-2.391 0-11-7.403-11-14.916 0-6.112 4.935-11.084 11-11.084 6.066 0 11 4.972 11 11.084 0 7.513-8.607 14.916-11 14.916Z"
        fill="#074CE7"
      />
    </g>
  </svg>
);

export default LocationSvg;
