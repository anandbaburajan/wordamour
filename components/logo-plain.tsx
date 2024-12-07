import { SVGProps } from "react";

const LogoPlain = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 188.622 186.072"
    {...props}
  >
    <path
      d="M54.936 39.255 37.98 56.211v74.806l94.31 94.31 94.312-94.31V56.21l-16.955-16.956h-30.582L132.292 86.03 85.518 39.255Zm4.156 10.036h22.463l50.737 50.736 50.737-50.736h22.462l11.077 11.076v66.687l-84.276 84.275-84.276-84.275V60.367Z"
      style={{
        fill: props.color,
        fillOpacity: props.opacity,
        strokeWidth: 0,
        strokeLinecap: "round",
      }}
      transform="translate(-37.98 -39.255)"
    />
  </svg>
);

export default LogoPlain;
