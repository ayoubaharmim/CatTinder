import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"
export const Star = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#BFBFC0"
        stroke="#BFBFC0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m9.112 1.66 2.06 4.173 4.607.674-3.333 3.246.787 4.587-4.12-2.167-4.12 2.167.786-4.587-3.333-3.246 4.606-.674 2.06-4.173Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h16v16H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
)
