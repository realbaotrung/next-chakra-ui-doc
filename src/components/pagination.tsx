import NextLink from 'next/link'
import { ReactNode } from 'react'
import { Link, Text, LinkProps, SimpleGrid, HTMLChakraProps } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { RouteItem } from 'utils/get-route-context'

const PaginationLink = (
  props: LinkProps & { label: string; children: ReactNode },
) => {
  const { label, href, children, ...rest } = props

  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecor: 'none',
        }}
        flex='1'
        borderRadius='md'
        {...rest}
      >
        <Text fontSize='sm' px='2'>
          {label}
        </Text>
        <Text fontSize='lg' mt='1' fontWeight='bold' color='teal.400'>
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}

type PaginationProps = {
  previous: RouteItem,
  next: RouteItem,
} & HTMLChakraProps<'nav'>

export default function Pagination({ previous, next, ...rest }: PaginationProps) {
  return (
    <SimpleGrid
      as='nav'
      aria-label='Pagination'
      spacing='40px'
      my='64px'
      columns={2}
      {...rest}
    >
      {previous ? (
        <PaginationLink
          textAlign='left'
          label='Previous'
          href={previous.path}
          rel='prev'
        >
          <ChevronLeftIcon mr='1' fontSize='1.2em' />
          {previous.title}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink
          textAlign='right'
          label='Next'
          href={next.path}
          rel='next'
        >
          {next.title}
          <ChevronRightIcon mr='1' fontSize='1.2em' />
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}
