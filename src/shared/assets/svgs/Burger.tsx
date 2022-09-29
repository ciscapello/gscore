import * as React from "react";
import { SVGProps } from "react";

const SvgBurger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#burger_svg__a)"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M4 5h16M4 12h16M4 19h16" />
    </g>
    <defs>
      <clipPath id="burger_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgBurger;
