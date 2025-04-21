import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
export const Heart = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#6BD88E"
      stroke="#6BD88E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M26.787 3.147a7.333 7.333 0 0 0-10.374 0L15 4.56l-1.413-1.413A7.335 7.335 0 0 0 3.213 13.52l1.414 1.413L15 25.307l10.373-10.374 1.414-1.413a7.333 7.333 0 0 0 0-10.373Z"
    />
  </Svg>
)
