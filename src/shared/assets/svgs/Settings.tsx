import * as React from "react";
import { SVGProps } from "react";

const SvgSettings = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#Settings_svg__a)"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
      <path d="M18.506 7.566c.226.323.424.665.59 1.022l2.429 1.35a9.563 9.563 0 0 1 .01 4.125l-2.438 1.35a6.9 6.9 0 0 1-.59 1.022l.046 2.784a9.75 9.75 0 0 1-3.572 2.072l-2.39-1.434a8.257 8.257 0 0 1-1.182 0l-2.381 1.425a9.618 9.618 0 0 1-3.581-2.063l.047-2.775a7.509 7.509 0 0 1-.591-1.03l-2.428-1.35a9.563 9.563 0 0 1-.01-4.126l2.438-1.35a6.9 6.9 0 0 1 .59-1.022l-.046-2.784A9.75 9.75 0 0 1 9.019 2.71l2.39 1.434a8.277 8.277 0 0 1 1.181 0l2.382-1.425a9.618 9.618 0 0 1 3.581 2.063l-.047 2.784Z" />
    </g>
    <defs>
      <clipPath id="Settings_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgSettings;
