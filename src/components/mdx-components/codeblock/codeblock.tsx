import { Box, useBoolean } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import theme from 'prism-react-renderer/themes/nightOwl'
import CodeContainer from './code-container'
import CopyButton from './copy-button'
import Highlight from './highlight'

// NextJs Lazy loading
const ReactLiveBlock = dynamic(() => import('./react-live-block'))

export default function CodeBlock(props) {
  const [isMounted, { on }] = useBoolean()

  useEffect(
    /**
     * Lazily-load <ReactLiveBlock /> to save bundle size
     */
    on,
    [on],
  )

  const {
    className,
    live = true,
    manual,
    render,
    children,
    viewLines,
    ln,
    mountStylesheet = false,
  } = props.children.props

  const _live = live === 'true' || live === true

  const language = className?.replace(/language-/, '')
  const rawCode = children.trim()

  const reactLiveBlockProps = {
    rawCode,
    language,
    theme,
    noInline: manual,
    mountStylesheet,
  }

  if (isMounted && language === 'jsx' && _live === true) {
    return <ReactLiveBlock editable {...reactLiveBlockProps} />
  }

  if (isMounted && render) {
    return <ReactLiveBlock editable={false} {...reactLiveBlockProps} />
  }

  return (
    <Box position='relative' zIndex='0'>
      <CodeContainer px='0' overflow='hidden'>
        <Highlight
          codeString={rawCode}
          language={language}
          theme={theme}
          metaString={ln}
          showLines={viewLines}
        />
      </CodeContainer>
      <CopyButton top='4' code={rawCode} />
    </Box>
  )
}
