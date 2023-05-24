import { HTMLChakraProps, chakra} from "@chakra-ui/react"
import { RefObject, forwardRef } from "react"

export const Anchor = forwardRef(
  (props: HTMLChakraProps<'a'>, ref: RefObject<HTMLAnchorElement>) => (
    <chakra.a
      ref={ref}
      apply='mdx.a'
      {...props}
    />
  )
)
