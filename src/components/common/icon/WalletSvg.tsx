import { SVGProps } from 'react';

// const WalletSvg = (props: SVGProps<SVGSVGElement>) => (
//   <svg width={21} height={20} fill="none" {...props}>
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M19.889 12.896H15.84a3.446 3.446 0 0 1-3.442-3.44 3.447 3.447 0 0 1 3.442-3.442h4.048a.75.75 0 0 1 0 1.5H15.84a1.945 1.945 0 0 0-1.942 1.942c0 1.069.872 1.94 1.942 1.94h4.048a.75.75 0 0 1 0 1.5Z"
//       fill="#002B79"
//     />
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M16.298 10.144h-.312a.75.75 0 0 1 0-1.5h.312a.75.75 0 0 1 0 1.5Z"
//       fill="#002B79"
//     />
//     <mask
//       id="a"
//       style={{
//         maskType: 'luminance',
//       }}
//       maskUnits="userSpaceOnUse"
//       x={0}
//       y={0}
//       width={21}
//       height={20}
//     >
//       <path fillRule="evenodd" clipRule="evenodd" d="M0 0h20.639v19.173H0V0Z" fill="#fff" />
//     </mask>
//     <g mask="url(#a)">
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M5.998 1.5A4.503 4.503 0 0 0 1.5 5.998v7.177a4.503 4.503 0 0 0 4.498 4.498h8.643a4.503 4.503 0 0 0 4.498-4.498V5.998A4.503 4.503 0 0 0 14.642 1.5H5.998Zm8.643 17.673H5.998A6.005 6.005 0 0 1 0 13.175V5.998A6.005 6.005 0 0 1 5.998 0h8.643a6.004 6.004 0 0 1 5.998 5.998v7.177a6.004 6.004 0 0 1-5.997 5.998Z"
//         fill="#002B79"
//       />
//     </g>
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M10.685 6.038h-5.4a.75.75 0 0 1 0-1.5h5.4a.75.75 0 0 1 0 1.5Z"
//       fill="#002B79"
//     />
//   </svg>
// );

// export default WalletSvg;

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
