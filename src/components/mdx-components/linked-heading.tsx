import { HTMLChakraProps, chakra } from '@chakra-ui/react'

export type LinkedHeadingProps = HTMLChakraProps<'h2'>

export default function LinkedHeading(props: LinkedHeadingProps) {
  return (
    <chakra.h2
        data-group=''
        css={{ scrollMarginBlock: '6.875rem' }}
        {...props}
      >
      <span className='content'>{props.children}</span>

      {/* ------------------------------------------------------------ */}
      {/* Hashtag as Link - Related to Table of Contents on the right
        * of the Page */}
      {/* ------------------------------------------------------------ */}
      {props.id && (
        <chakra.a
          aria-label='anchor'
          color='teal.500'
          fontWeight='normal'
          outline='none'
          _focus={{ opacity: 1, boxShadow: 'outline' }}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          ml='0.375'
          href={`#${props.id}`}
        >
          {' '} #
        </chakra.a>
      )}
    </chakra.h2>
  )
}
