import { Flex, useColorMode, useColorModeValue, useDisclosure, chakra, Box, useUpdateEffect } from "@chakra-ui/react";
import { useRef } from "react";
import { FaMoon, FaSun } from 'react-icons/fa'
import NextLink from 'next/link'
import Logo, { LogoIcon } from './logo'
import Search from './omni-search'

function HeaderContent() {
  const mobileNav = useDisclosure()

  const { toggleColorMode: toggleMode } = useColorMode()

  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const mobileNavBtnRef = useRef<HTMLButtonElement>()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  return (
    <>
      <Flex w='100%' h='100%' align='center' justify='space-between'>
        <Flex align='center'>
          <NextLink href='/' passHref >
            <chakra.a
              display='block'
              aria-label="Chakra UI, Back to homepage"
            >
              <Logo display={{ base: 'none', md: 'block' }} />
              <Box minW='3rem' display={{ base: 'block', md: 'none' }}>
                <LogoIcon />
              </Box>
            </chakra.a>
          </NextLink>
        </Flex>

        <Flex
          justify='flex-end'
          w='100%'
          align='center'
          color='gray.400'
          maxW='1100px'
        >

          {/* NOTE: continue doing 'gcc' to take comment */}
          <Search />
        </Flex>
      </Flex>
    </>
  )
}
