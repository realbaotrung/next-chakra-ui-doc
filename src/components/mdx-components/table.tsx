import { HTMLChakraProps, chakra } from '@chakra-ui/react'

export const Table = (props: HTMLChakraProps<'table'>) => (
  <chakra.div overflowX='auto'>
    <chakra.table textAlign='left' mt='32px' width='full' {...props} />
  </chakra.div>
)

export const THead = (props: HTMLChakraProps<'thead'>) => (
  <chakra.th
    bg='gray.50'
    _dark={{ bg: 'whiteAlpha.100' }}
    fontWeight='semibold'
    p={2}
    fontSize='sm'
    {...props}
  />
)

export const TData = (props: HTMLChakraProps<'td'>) => (
  <chakra.td
    p={2}
    borderTopWidth='1px'
    borderColor='inherit'
    fontSize='sm'
    whiteSpace='normal'
    {...props}
  />
)
