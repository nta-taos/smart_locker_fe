import { SVGProps } from 'react';

const BoxSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      d="M5.75 3a1 1 0 0 0-.863.496l-1.75 3A1 1 0 0 0 3 7v12c0 1.093.907 2 2 2h14c1.093 0 2-.907 2-2V7a1 1 0 0 0-.137-.504l-1.75-3A1.001 1.001 0 0 0 18.25 3H5.75Zm.574 2h11.352l1.166 2H5.158l1.166-2ZM5 9h14v10H5V9Zm4 2v2h6v-2H9Z"
      fill="#454545"
    />
  </svg>
);

export default BoxSvg;
