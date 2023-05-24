import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import Container from 'components/container'
import { t } from 'utils/i18n'
import NextLink from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { getUrl } from './get-url'
import {
  ChakraNextUnwrappedImage,
} from 'components/chakra-next-image'

export default function ChakraProAd() {
  return (
    <Box as='section' bg='gray.900' color='white' overflow='hidden'>
      <Container pt='24' pb='0'>
        <Flex align='center' direction='column' textAlign='center' mb='10'>
          {/* --- Premium title with Badge ---- */}
          <Text casing='uppercase' letterSpacing='wide' fontWeight='bold'>
            {t('component.chakra-pro.home-page-ad.premium-components')}{' '}
            <Badge
              colorScheme='yellow'
              variant='solid'
              color='gray.800'
              mt='-1'
              ml='2'
            >
              {t('component.chakra-pro.home-page-ad.new')}
            </Badge>
          </Text>

          {/* --- Main Heading Typo highlight --- */}
          <Heading
            mt='4'
            fontWeight='extrabold'
            size='3xl'
            maxW='14ch'
            mx='auto'
            letterSpacing='tighter'
          >
            <Box
              as='span'
              bgGradient='linear(to-r, blue.400, teal.400)'
              // The background is painted within (clipped to) the foreground text.
              // https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
              bgClip='text'
            >
              {t('component.chakra-pro.home-page-ad.build-faster')}
            </Box>{' '}
            {t('component.chakra-pro.home-page-ad.with-chakra-ui-pro')}
          </Heading>

          {/* --- Main paragraph --- */}
          <Text maxW='48ch' mx='auto' fontSize='lg' mt='6' opacity={0.8}>
            {t('component.chakra-pro.home-page-ad.description')}
          </Text>

          {/* --- Button link to chakra pro ad --- */}
          <NextLink href={getUrl('homepage-ad')} passHref>
            <Button
              mt='6'
              h='3.2rem'
              as='a'
              target='_blank'
              rel='noopener'
              px='8'
              py='3'
              size='md'
              fontSize='lg'
              fontWeight='semibold'
              rounded='md'
              colorScheme='teal'
              transition='all 0.2s'
              bg='whiteAlpha.300'
              _hover={{ bg: 'whiteAlpha.400 ' }}
              rightIcon={<FaArrowRight fontSize='0.8em' />}
            >
              {t('component.chakra-pro.home-page-ad.learn-more')}
            </Button>
          </NextLink>
        </Flex>

        {/* --- Image Chakra UI Pro Ad --- */}
        <Box position='relative' top='3'>
          <ChakraNextUnwrappedImage
            src='/chakra-ui-ad.png'
            alt='Chakra UI Pro Image'
            layout='responsive'
            width={1200}
            height={320}
            loading='lazy'
          />
        </Box>
      </Container>
    </Box>
  )
}
