import { Box, HStack, LinkBox, LinkOverlay,SimpleGrid, Text } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'
import { DiscordIcon } from './icons'
import { FaTwitter } from 'react-icons/fa'

type CommunityCardItemProps = {
  accentColor: any
  icon: ReactElement
  href: string
  children: ReactNode
}

function CommunityCardItem({
  accentColor,
  icon,
  href,
  children,
}: CommunityCardItemProps) {
  return (
    <LinkBox>
      <HStack
        justify='center'
        spacing='5'
        borderWidth='1px'
        px='4'
        py='3'
        rounded='lg'
      >
        <Box as='span' fontSize='xl' color={accentColor}>
          {icon}
        </Box>
        <LinkOverlay href={href} isExternal>
          <Text fontWeight='semibold'>{children}</Text>
        </LinkOverlay>
      </HStack>
    </LinkBox>
  )
}

export default function JoinCommunityCards() {
  return (
    <SimpleGrid mt='8' columns={{ base: 1, md: 2 }} spacing='4'>
      <CommunityCardItem
        accentColor='#5865F2'
        icon={<DiscordIcon boxSize='20px' />}
        href='https://chakra-ui.com/discord'
      >
        Join the Discord
      </CommunityCardItem>

      <CommunityCardItem
        accentColor='twitter.500'
        icon={<FaTwitter />}
        href='https://twitter.com/chakra_ui'
      >
        Follow us on Twitter
      </CommunityCardItem>
    </SimpleGrid>
  )
}
