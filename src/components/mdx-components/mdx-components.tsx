import * as Chakra from '@chakra-ui/react'
import {
  HTMLChakraProps,
  Alert,
  AspectRatio,
  Box,
  chakra,
  Kbd,
  Link,
} from '@chakra-ui/react'
import NextImage, { ImageProps } from 'next/image'
import { FiFigma } from 'react-icons/fi'
import LinkedHeading, { LinkedHeadingProps } from './linked-heading'
import InlineCode from './inline-code'
import { Pre } from './pre'
import { ReactElement, ReactNode } from 'react'
import TutorialCodeBlock from 'components/tutorial/tutorial-code-block'
import CodeBlock from './codeblock/codeblock'
import { TData, THead, Table } from './table'
import { Anchor } from './anchor'
import { CarbonAd } from './carbon-ad'
import ComponentLinks from './component-link'
import IconList from './icons-list'

type MDXComponentsImageProps = {
  ratio: number
  border: any
} & ImageProps

export const MDXComponents = {
  ...Chakra,
  FiFigma,
  Image: ({ ratio, border, src, ...props }: MDXComponentsImageProps) => (
    <AspectRatio
      my='5'
      position='relative'
      borderWidth={border ? '1px' : undefined}
      ratio={ratio}
    >
      <NextImage
        src={src}
        alt=''
        layout='fill' // Next12 only
        objectFit='contain' // Next12 only
        {...props}
      />
    </AspectRatio>
  ),
  LinkedImage: ({
    href,
    ...props
  }: { href: string } & MDXComponentsImageProps) => (
    <Link display='block' my='10' href={href} isExternal>
      <MDXComponents.Image {...props} />
    </Link>
  ),
  h1: (props: HTMLChakraProps<'h1'>) => <chakra.h1 apply='mdx.h1' {...props} />,
  h2: (props: LinkedHeadingProps) => (
    <LinkedHeading apply='mdx.h2' {...props} />
  ),
  h3: (props: LinkedHeadingProps) => (
    <LinkedHeading as='h3' apply='mdx.h2' {...props} />
  ),
  h4: (props: LinkedHeadingProps) => (
    <LinkedHeading as='h4' apply='mdx.h3' {...props} />
  ),
  hr: (props: HTMLChakraProps<'hr'>) => <chakra.hr apply='mdx.hr' {...props} />,
  strong: (props: HTMLChakraProps<'strong'>) => (
    <Box as='strong' fontWeight='semibold' {...props} />
  ),
  code: InlineCode,
  pre: (props) => {
    if (typeof props.children === 'string') return <Pre {...props} />
    if ((props.children as any).props.type === 'tutorial') {
      const className = props.children.props.className || ''
      const code = props.children.props.children.trim() || ''
      const language = className.replace(/language/, '')
      return (
        <TutorialCodeBlock
          language={language}
          code={code}
          path={props.children.props.path}
          showLineNumbers={props.showLineNumbers}
        />
      )
    }
    return <CodeBlock {...props} />
  },
  kbd: Kbd, // keyboard shortcut component
  br: ({ reset, ...props }) => (
    <Box
      as={reset ? 'br' : undefined}
      height={reset ? undefined : '24px'}
      {...props}
    />
  ),
  table: Table,
  th: THead,
  td: TData,
  a: Anchor,
  p: (props: HTMLChakraProps<'p'>) => <chakra.p apply='mdx.p' {...props} />,
  ul: (props: HTMLChakraProps<'ul'>) => <chakra.ul apply='mdx.ul' {...props} />,
  ol: (props: HTMLChakraProps<'ol'>) => <chakra.ol apply='mdx.ul' {...props} />,
  li: (props: HTMLChakraProps<'li'>) => <chakra.li pb='4px' {...props} />,
  blockquote: (props) => (
    <Alert
      as='blockquote'
      mt='4'
      role='none'
      status='warning'
      variant='left-accent'
      my='1.5rem'
      {...props}
    />
  ),
  'carbon-ad': CarbonAd,
  ComponentLinks,
  IconList,
  // TODO: continue with this
  // PropsTable,
}
