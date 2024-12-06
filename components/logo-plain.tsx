import { SVGProps } from "react";

const LogoPlain = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 179.608 181.034"
    {...props}
  >
    <path
      d="M56.813 41.775 42.488 56.1v76.905l82.348 82.348 7.456 7.456 7.455-7.456 82.348-82.348V56.1L207.77 41.775h-20.258l-55.22 55.22-55.22-55.22Zm4.368 10.543h11.523l54.316 54.316v95.992l-73.989-73.988V60.467Zm130.698 0h11.524l8.149 8.149v68.17l-73.989 73.99v-95.993Z"
      style={{
        fill: "#000",
        fillOpacity: "50%",
        stroke: "#272727",
        strokeWidth: 0,
        strokeLinecap: "round",
      }}
      transform="translate(-42.488 -41.775)"
    />
  </svg>
);

export default LogoPlain;
