import { HTMLChakraProps, useDimensions, chakra } from '@chakra-ui/react'
import { useRef } from 'react'

export default function InlineCode(props: HTMLChakraProps<'code'>) {
  const codeRef = useRef(null)
  const dimensions = useDimensions(codeRef)

  /**
   * Value (in pixels) comes from the minimum width of
   * the 'li' parent element in the changelog page
   * before the layout shifts to mobile
   */
  const MIN_CONTENT_WIDTH = 363 // px
  const shouldWrap = dimensions?.borderBox.width > MIN_CONTENT_WIDTH

  return (
    <chakra.code
      apply='mdx.code'
      color={'purple.500'}
      _dark={{
        color: 'purple.200',
      }}
      ref={codeRef}
      whiteSpace={shouldWrap ? undefined : 'nowrap'}
      {...props}
    />
  )
}
