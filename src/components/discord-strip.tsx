import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  LightMode,
  Stack,
  Text,
} from '@chakra-ui/react'
import Container from './container'
import { DiscordIcon } from './icons'
import { t } from 'utils/i18n'

const COLOR_DISCORD = '#5865f2'

export default function DiscordStrip(props: BoxProps) {
  return (
    <Box bgColor={COLOR_DISCORD} {...props}>
      <Container py='8'>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          mx='auto'
          color='white'
          alignItems='center'
          justifyContent='center'
        >
          <Stack flex='1' isInline spacing='6' pr={{ base: 0, md: '4' }}>
            <DiscordIcon boxSize='48px' />
            <Box flex='1'>
              <Heading size='md' lineHeight='1.2' mb='1'>
                {t('component.discord-strip.heading')}
              </Heading>
              <Text opacity={0.7}>
                {t('component.discord-strip.description')}
              </Text>
            </Box>
          </Stack>
          <LightMode>
            <Button
              w={{ base: '100%', md: 'auto' }}
              mt={{ base: '6', md: 0 }}
              alignSelf='center'
              as='a'
              // minW='7rem'
              color='gray.800'
              bgColor='white'
              href='https://discord.gg/chakra-ui'
              rel='noopener'
              target='_blank'
              fontSize='md'
              rounded='lg'
              px='24px'
              h='56px'
            >
              {t('component.discord-strip.join-the-chakra-discord')}
            </Button>
          </LightMode>
        </Flex>
      </Container>
    </Box>
  )
}
