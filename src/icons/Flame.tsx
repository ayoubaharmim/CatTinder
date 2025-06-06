import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop, SvgProps } from "react-native-svg"

export const Flame = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="M4.078 5.66c-.02 0-.034 0-.048-.015-.47-.622-.588-1.695-.616-2.103-.007-.08-.097-.121-.166-.083C1.795 4.272.446 6.202.446 8.064c0 3.207 2.224 5.895 6.054 5.895 3.588 0 6.054-2.768 6.054-5.892 0-4.086-2.916-6.791-5.514-8.016-.07-.034-.146.025-.139.097.34 2.204-.124 4.595-2.826 5.518l.003-.007Z"
    />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(12.1085 0 0 13.9177 6.5 13.959)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EC537E" />
        <Stop offset={1} stopColor="#FD267D" />
      </RadialGradient>
    </Defs>
  </Svg>
)