import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'
import { Frontmatter } from 'src/types/frontmatter'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import { t } from 'utils/i18n'
import SEO from './seo'
import { AdBanner } from './chakra-pro/ad-banner'
import Header from './header'
import Footer from './footer'
import { Badge, Box, Flex, chakra } from '@chakra-ui/react'
import EditPageLink from './edit-page-button'
import { convertBackticksToInlineCode } from 'utils/convert-backticks-to-inline-code'
import TableOfContent from './table-of-content'

const Z_INDEX_SKIP_NAV_LINK = 20

function useHeadingFocusOnRouteChange() {
  const router = useRouter()

  useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'))
      heading?.focus()
    }

    router.events.on('routeChangeComplete', onRouteChange)
    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [router.events])
}

interface PageContainerProps {
  frontmatter: Frontmatter
  hideToc?: boolean
  maxWidth?: string
  children: ReactNode
  leftSidebar?: ReactElement
  rightSidebar?: ReactElement
  pagination?: ReactElement
}

export default function PageContainer({
  frontmatter,
  hideToc,
  maxWidth='48rem',
  children,
  leftSidebar,
  rightSidebar,
  pagination,
}: PageContainerProps) {
  // Focusing on Heading when route is changed
  useHeadingFocusOnRouteChange()

  if (!frontmatter) return null

  const { title, description, editUrl, version, headings = [] } = frontmatter

  return (
    <>
      {/* Support SEO for current accessed pages */}
      <SEO title={title} description={description} />
      {/* Skip Nav: https://chakra-ui.com/docs/components/skip-nav */}
      <SkipNavLink zIndex={Z_INDEX_SKIP_NAV_LINK}>
        {t('component.page-container.skip-to-content')}
      </SkipNavLink>
      {/* Show Ad banner at the first position of page */}
      <AdBanner />
      {/* Show Header [Logo, SearchBar, VersionSwitcher, Icons] */}
      <Header />
      {/* Content of Page */}
      <Box as='main' className='main-content' w='full' maxW='8xl' mx='auto'>
        <Box display={{ md: 'flex' }}>
          {/* --- Show Left Sidebar in page content --- */}
          {leftSidebar || null}

          {/* --- Show Center Main Content in page content --- */}
          <Box flex='1' minW='0'>
            {/* Skip Nav: https://chakra-ui.com/docs/components/skip-nav */}
            <SkipNavContent />
            <Box id='content' px='5' mx='auto' minH='76vh'>
              <Flex>
                <Box
                  minW='0'
                  flex='auto'
                  px={{ base: '4', sm: '6', xl: '8' }}
                  pt='10'
                >
                  <Box maxW={maxWidth}>
                    <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1'>
                      {convertBackticksToInlineCode(title)}
                    </chakra.h1>
                    {version && (
                      <Badge colorScheme='teal' letterSpacing='wider'>
                        v{version}
                      </Badge>
                    )}
                    {/* ------------ Content of Markdown ------------- */}
                    {children}
                    {/* ------------ Content of Markdown ------------- */}
                    <Box mt='40px'>
                      <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                      {/* ------------ Pagination of Markdown ------------- */}
                      {pagination || null}
                      {/* ------------ Pagination of Markdown ------------- */}
                    </Box>
                    <Box pb='20'>
                      <Footer />
                    </Box>
                  </Box>
                </Box>

                {/* --- On the Right of page content, TOC - Table of Content --- */}
                {!hideToc && (
                  <TableOfContent
                    visibility={headings.length === 0 ? 'hidden' : 'initial'}
                    headings={headings}
                  />
                )}
                {/* --- On the Right of page content --- */}
                {rightSidebar}
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
