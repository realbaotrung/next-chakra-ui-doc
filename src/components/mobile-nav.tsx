import {
  Box,
  BoxProps,
  Center,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  useColorModeValue,
  useUpdateEffect,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode, Ref, forwardRef, useEffect, useRef, useState } from 'react'
import NextLink from 'next/link'
import useRouteChanged from 'src/hooks/use-route-changed'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { RemoveScroll } from 'react-remove-scroll'
import Logo from './logo'
import SponsorButton from './sponsor-button'
import { SidebarContent, mainNavLinks } from './sidebar/sidebar'
import { AiOutlineMenu } from 'react-icons/ai'
import { getRoutes } from 'layouts/mdx'

const Z_INDEX_MOBILE_NAV_CONTENT = 20

type NavLinkProps = {
  href: string
  children: ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  const router = useRouter()
  const bgActiveHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100')

  const isActive = router.asPath.startsWith(href)

  return (
    <GridItem as={NextLink} href={href}>
      <Center
        flex='1'
        minH='40px'
        as='button'
        rounded='md'
        transition='0.2s all'
        fontWeight={isActive ? 'semibold' : 'medium'}
        bg={isActive ? 'teal.400' : undefined}
        borderWidth={isActive ? undefined : '1px'}
        color={isActive ? 'white' : undefined}
        _hover={{
          bg: isActive ? 'teal.500' : bgActiveHoverColor,
        }}
      >
        {children}
      </Center>
    </GridItem>
  )
}

type ScrollViewProps = {
  onScrolled: (scrolled: boolean) => void
} & BoxProps

function ScrollView({ onScrolled, ...rest }: ScrollViewProps) {
  const [y, setY] = useState(0)

  const scrollViewRef = useRef(null)
  const { scrollY } = useScroll({
    container: scrollViewRef,
  })

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setY(latest)
  })

  useUpdateEffect(() => {
    onScrolled(y > 5 ? true : false)
  }, [y])

  return (
    <Box
      ref={scrollViewRef}
      flex='1'
      id='routes'
      overflow='auto'
      px='6'
      pb='6'
      {...rest}
    />
  )
}

export const MobileNavButton = forwardRef(
  (props: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <IconButton
        ref={ref}
        aria-label='Open menu'
        variant='ghost'
        color={useColorModeValue('gray.800', 'inherit')}
        display={{ base: 'flex', md: 'none' }}
        icon={<AiOutlineMenu />}
        {...props}
      />
    )
  },
)

interface MobileNavContentProps {
  isOpen?: boolean
  onClose?: () => void
}

export function MobileNavContent({ isOpen, onClose }: MobileNavContentProps) {
  const closeBtnRef = useRef<HTMLButtonElement>()
  const { pathname, asPath } = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')

  // Notify and execute callback function when route is changed
  useRouteChanged(onClose)

  /**
   * Scenario: Menu is open on mobile, and user resized to desktop/tablet viewport
   * Result: We'll close the menu
   * @return true of false
   */
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

  useEffect(() => {
    if (showOnBreakpoint === false) {
      onClose()
    }
  }, [showOnBreakpoint, onClose])

  // Focus on closed icon button when MobileNavContent is opened
  // NOTE: consider this best practice
  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  const [shadow, setShadow] = useState<string>()

  return (
    <AnimatePresence>
      {isOpen && (
        // if forwardProps is true - everything will be forwarded to a single child node
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction='column'
              w='100%'
              bg={bgColor}
              h='100vh'
              overflow='auto'
              pos='absolute'
              top='0'
              left='0'
              zIndex={Z_INDEX_MOBILE_NAV_CONTENT}
              pb='8'
            >
              <Box>
                <Flex justify='space-between' px='6' pt='5' pb='4'>
                  <Logo sx={{ rect: { fill: 'teal.300' } }} />
                  <HStack spacing='5'>
                    <SponsorButton display='flex' />
                    <CloseButton ref={closeBtnRef} onClick={onClose} />
                  </HStack>
                </Flex>
                <Grid
                  px='6'
                  pb='6'
                  pt='2'
                  shadow={shadow}
                  templateColumns='repeat(2, 1fr)'
                  gap='2'
                >
                  {mainNavLinks.map((item) => (
                    <NavLink href={item.href} key={item.label}>
                      {item.label}
                    </NavLink>
                  ))}
                </Grid>
              </Box>

              <ScrollView
                onScrolled={(scrolled: boolean) => {
                  setShadow(scrolled ? 'md' : undefined)
                }}
              >
                <SidebarContent
                  pathname={pathname}
                  routes={getRoutes(asPath)}
                />
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}
