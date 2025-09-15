import { SVGProps } from 'react';

const WalletSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={29} height={26} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.185 17.195h-5.397a4.595 4.595 0 0 1-4.59-4.586c0-2.53 2.059-4.59 4.59-4.59h5.397a1 1 0 0 1 0 2h-5.397a2.594 2.594 0 0 0-2.59 2.589 2.592 2.592 0 0 0 2.59 2.587h5.397a1 1 0 0 1 0 2"
      fill="#074CE7"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.398 13.524h-.416a1 1 0 0 1 0-2h.416a1 1 0 0 1 0 2"
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
      width={29}
      height={26}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M.667 0h27.518v25.564H.667V0Z" fill="#fff" />
    </mask>
    <g mask="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.663 2a6.004 6.004 0 0 0-5.997 5.997v9.57a6.004 6.004 0 0 0 5.997 5.997H20.19a6.003 6.003 0 0 0 5.996-5.997v-9.57A6.003 6.003 0 0 0 20.189 2H8.663ZM20.19 25.564H8.663c-4.409 0-7.997-3.588-7.997-7.997v-9.57C.666 3.587 4.254 0 8.663 0H20.19c4.409 0 7.996 3.587 7.996 7.997v9.57c0 4.409-3.587 7.997-7.996 7.997Z"
        fill="#074CE7"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.913 8.05H7.714a1 1 0 0 1 0-2h7.199a1 1 0 0 1 0 2"
      fill="#074CE7"
    />
  </svg>
);

export default WalletSvg;
