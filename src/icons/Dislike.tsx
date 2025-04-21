import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
export const Dislike = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#E16359"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 8 8 24M8 8l16 16"
    />
  </Svg>
)