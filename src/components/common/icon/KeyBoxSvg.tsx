import { SVGProps } from 'react';

const KeyBoxSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={28} height={28} fill="none" {...props}>
    <mask
      id="a"
      style={{
        maskType: 'luminance',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={28}
      height={28}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.667.667h26.666v26.667H.667V.667Z"
        fill="#fff"
      />
    </mask>
    <g mask="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.219 2.667c-3.372 0-5.552 2.31-5.552 5.888v10.89c0 3.578 2.18 5.889 5.552 5.889h11.557c3.376 0 5.557-2.311 5.557-5.888V8.555c0-3.577-2.181-5.888-5.554-5.888H8.219Zm11.557 24.667H8.219c-4.518 0-7.552-3.171-7.552-7.888V8.555C.667 3.838 3.7.667 8.219.667h11.56c4.518 0 7.554 3.17 7.554 7.888v10.89c0 4.718-3.036 7.889-7.557 7.889Z"
        fill="#002B79"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.785 12.531a1.47 1.47 0 1 0 1.467 1.47c0-.81-.659-1.468-1.467-1.47m-.003 4.939A3.474 3.474 0 0 1 6.313 14a3.473 3.473 0 0 1 3.47-3.469 3.473 3.473 0 0 1 3.469 3.47 3.474 3.474 0 0 1-3.47 3.469"
      fill="#002B79"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.68 17.47a1 1 0 0 1-1-1v-1.471h-7.425a1 1 0 1 1 0-2h8.424a1 1 0 0 1 1 1v2.47a1 1 0 0 1-1 1"
      fill="#002B79"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.909 17.47a1 1 0 0 1-1-1v-2.471a1 1 0 0 1 2 0v2.47a1 1 0 0 1-1 1"
      fill="#002B79"
    />
  </svg>
);

export default KeyBoxSvg;
