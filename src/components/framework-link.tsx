import { Box, Link, SimpleGrid, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import {
  BlitzSvg,
  CreateReactAppSvg,
  GatsbySvg,
  MeteorSvg,
  NextjsSvg,
  RedwoodSvg,
  RemixSvg,
  ViteSvg,
} from './framework-svg'

type FrameworkLinkItemProps = {
  accentColor: any
  href: string
  children: ReactNode
  name: string
}

function FrameworkLinkItem({
  accentColor,
  href,
  children,
  name,
}: FrameworkLinkItemProps) {
  return (
    <NextLink href={href} passHref>
      <Link
        bg='white'
        display='block'
        textDecoration='none'
        borderRadius='xl'
        overflow='hidden'
        transform='auto'
        transition='all 0.1s ease-in-out'
        _hover={{ textDecoration: 'none', translateY: '-2px', shadow: 'md' }}
      >
        <Box pt='4'>
          {children}
          <Box bg={accentColor} mt='4' py='1' color='white'>
            <Text textAlign='center' fontSize='sm' fontWeight='bold'>
              {name}
            </Text>
          </Box>
        </Box>
      </Link>
    </NextLink>
  )
}

export default function FrameworkLinks() {
  return (
    <SimpleGrid mt='12' minChildWidth='160px' spacing='40px' fontSize='6xl'>
      {/* Create React App Link */}
      <FrameworkLinkItem
        href='/getting-started/cra-guide'
        accentColor='#0AC09D'
        name='Create React App'
      >
        <CreateReactAppSvg style={{ margin: 'auto' }} />
      </FrameworkLinkItem>

      {/* NextJS Link */}
      <FrameworkLinkItem
        href='/getting-started/nextjs-guide'
        accentColor='black'
        name='Next.js'
      >
        <NextjsSvg style={{ margin: 'auto' }} />
      </FrameworkLinkItem>

      {/* Gatsby Link */}
      <FrameworkLinkItem
        href='/getting-started/gatsby-guide'
        accentColor='#663399'
        name='Gatsby'
      >
        <GatsbySvg style={{ margin: 'auto' }} />
      </FrameworkLinkItem>

      {/* BlitzJs Link */}
      <FrameworkLinkItem
        href='/getting-started/blitzjs-guide'
        accentColor='#6700EB'
        name='Blitz.js'
      >
        <BlitzSvg style={{ margin: 'auto' }} />
      </FrameworkLinkItem>

      {/* RedWoodJs Link */}
      <FrameworkLinkItem
        href='/getting-started/redwoodjs-guide'
        accentColor='#BF4722'
        name='RedwoodJS'
      >
        <RedwoodSvg style={{ margin: 'auto' }} />
      </FrameworkLinkItem>

      {/* Remix Link */}
      <FrameworkLinkItem
        href='/getting-started/remix-guide'
        accentColor='#121212'
        name='Remix'
      >
        <RemixSvg style={{ margin: 'auto' }} />
      </FrameworkLinkItem>

      {/* Vite Link */}
      <FrameworkLinkItem
        href='/getting-started/vite-guide'
        accentColor='#C07600'
        name='Vite'
      >
        <ViteSvg style={{ margin: 'auto' }} />
      </FrameworkLinkItem>

      {/* Meteor Link */}
      <FrameworkLinkItem
        href='/getting-started/meteor-guide'
        accentColor='#FF6A3E'
        name='Meteor'
      >
        <MeteorSvg style={{ margin: 'auto' }} />
      </FrameworkLinkItem>
    </SimpleGrid>
  )
}
