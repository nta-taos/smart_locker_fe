import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={96} height={128} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <g filter="url(#b)">
        <ellipse cx={12} cy={29} rx={4} ry={2} fill="#000" fillOpacity={0.12} />
      </g>
      <mask id="d" maskUnits="userSpaceOnUse" x={7} y={10} width={82} height={103} fill="#000">
        <path fill="#fff" d="M7 10h82v103H7z" />
        <path d="M48 11c22.091 0 40 17.392 40 38.846 0 12.77-6.346 24.1-16.142 31.18-7.525 5.492-18.274 14.19-20.76 28.254-.269 1.525-1.55 2.708-3.098 2.708-1.549 0-2.83-1.183-3.099-2.708-2.485-14.065-13.235-22.762-20.76-28.254C14.346 73.946 8 62.616 8 49.846 8 28.392 25.909 11 48 11Z" />
      </mask>
      <path
        d="M48 11c22.091 0 40 17.392 40 38.846 0 12.77-6.346 24.1-16.142 31.18-7.525 5.492-18.274 14.19-20.76 28.254-.269 1.525-1.55 2.708-3.098 2.708-1.549 0-2.83-1.183-3.099-2.708-2.485-14.065-13.235-22.762-20.76-28.254C14.346 73.946 8 62.616 8 49.846 8 28.392 25.909 11 48 11Z"
        fill="#EA352B"
      />
      <path
        d="M88 49.846h1-1Zm-16.142 31.18-.585-.81-.004.003.59.807Zm-20.76 28.254-.984-.174.985.174Zm-6.197 0 .985-.174-.985.174Zm-20.76-28.254.59-.807-.005-.003-.585.81ZM8 49.846H7h1ZM48 11v1c21.567 0 39 16.971 39 37.846h2C89 27.812 70.616 10 48 10v1Zm40 38.846h-1c0 12.428-6.175 23.465-15.727 30.37l.585.81.586.81C82.482 74.582 89 62.959 89 49.847h-1Zm-16.142 31.18-.59-.807c-7.53 5.495-18.593 14.398-21.154 28.887l.985.174.984.174c2.411-13.64 12.845-22.132 20.365-27.62l-.59-.808Zm-20.76 28.254-.984-.174c-.194 1.097-1.1 1.882-2.114 1.882v2c2.083 0 3.738-1.581 4.083-3.534l-.984-.174ZM48 111.988v-1c-1.015 0-1.92-.785-2.114-1.882l-.985.174-.984.174c.345 1.953 2 3.534 4.083 3.534v-1Zm-3.099-2.708.985-.174c-2.56-14.49-13.626-23.392-21.156-28.887l-.59.807-.589.808c7.52 5.488 17.955 13.98 20.366 27.62l.984-.174Zm-20.76-28.254.586-.81C15.174 73.31 9 62.274 9 49.846H7c0 13.111 6.517 24.735 16.555 31.99l.586-.81ZM8 49.846h1C9 28.972 26.433 12 48 12v-2C25.384 10 7 27.812 7 49.846h1Z"
        fill="url(#c)"
        mask="url(#d)"
      />
      <circle cx={48} cy={51} r={32} fill="#fff" />
      <g filter="url(#e)">
        <path
          d="M34.677 76H62.18L64 77.25l-1.819 4.167L30 83l4.677-7Z"
          fill="#000"
          fillOpacity={0.6}
        />
      </g>
      <path
        d="M62 76.889c0-.491.398-.889.889-.889h.222c.491 0 .889.398.889.889 0 .061-.05.111-.111.111H62.11a.111.111 0 0 1-.111-.111ZM35 76.889c0-.491.398-.889.889-.889h.222c.491 0 .889.398.889.889 0 .061-.05.111-.111.111H35.11a.111.111 0 0 1-.111-.111Z"
        fill="#656565"
      />
      <rect x={31} y={30} width={34} height={46} rx={1} fill="#9C9C9C" />
      <rect x={35} y={29} width={29} height={1} rx={0.5} fill="#fff" />
      <rect x={46} y={40} width={1} height={4} rx={0.5} fill="#fff" />
      <rect x={35} y={63} width={1} height={6} rx={0.5} fill="#fff" />
      <rect x={51} y={40} width={1} height={4} rx={0.5} fill="#fff" />
    </g>
    <defs>
      <filter
        id="b"
        x={6}
        y={25}
        width={12}
        height={8}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={1} result="effect1_foregroundBlur_996_396" />
      </filter>
      <filter
        id="e"
        x={-22}
        y={24}
        width={138}
        height={111}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={26} result="effect1_foregroundBlur_996_396" />
      </filter>
      <linearGradient id="c" x1={48} y1={11} x2={48} y2={111.988} gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0.35} />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h96v128H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgComponent;
