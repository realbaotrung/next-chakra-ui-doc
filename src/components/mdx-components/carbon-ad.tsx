import {
  Box,
  chakra,
  Flex,
  SystemStyleObject,
  useTheme,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { loadScript } from 'utils/load-script'
import NextImage from 'next/image'
import { t } from 'utils/i18n'

/**
 * ADs - Carbon for Marketing
 * @returns
 */
export function CarbonAd() {
  const ref = useRef(null)

  const theme = useTheme()

  const carbonAdStyle: SystemStyleObject = {
    display: 'block',
    position: 'relative',
    margin: '32px 0',
    maxWidth: '480px',
    minHeight: '132px',
    borderRadius: '4px',
    bg: 'gray.50',
    _dark: {
      bg: 'rgba(36, 70, 93, 0.32)',
    },
    color: 'inherit',
    '@media (max-width: 480px)': {
      fontSize: '0.875em',
    },
    a: {
      textDecoration: 'none',
      color: 'inherit',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '.carbon-wrap': {
      display: 'flex',
      padding: '16px',
    },
    '.carbon-img': {
      marginRight: '16px',
      img: {
        display: 'block',
      },
    },
    '.carbon-text': {
      fontSize: '0.8rem',
      lineHeight: 1.4,
    },
    '.carbon-poweredby': {
      position: 'absolute',
      bottom: '16px',
      left: '162px',
      color: `${theme.color.gray[500]} !important`,
      display: 'block',
      fontSize: '10px',
      fontWeight: 'semibold',
      textTransform: 'uppercase',
      lineHeight: 1,
      letterSpacing: '0.2px',
    },
  }

  useEffect(() => {
    const scriptEl = document.getElementById('_carbonads_js')

    if (!ref.current || !!scriptEl) return

    const script = loadScript(
      'https://cdn.carbonads.com/carbon.js?serve=CE7DKK7L&placement=chakra-uicom',
      ref.current,
    )
    script.id = '_carbonads_js'
  }, [])

  return <chakra.span id='carbon-ad' ref={ref} sx={carbonAdStyle} />
}

export default function DocsPageChakraProAd() {
  return (
    <Flex
      as='a'
      p='4'
      bg='gray.50'
      _dark={{ bg: 'rgba(36, 70, 93, 0.32)' }}
      href='https://pro.chakra-ui.com/components?utm_source=chakra-ui.com&utm_medium=docs-ad'
      rel='noopener sponsored'
      target='_blank'
      maxW='xl'
      my='8'
      rounded='md'
    >
      <Box w='xs' h='100px' bg='gray.300' mr='4'>
        <NextImage
          alt='chakra ui pro'
          src='/chakra-pro-ad.png'
          layout='fixed'
          width='150'
          height='100'
        />
      </Box>
      <Flex direction='column'>
        <Box flex='1' fontSize='sm'>
          <b>{t('component.mdx-components.carbon-ad.message-bold')}</b>{' '}
          {t('component.mdx-components.carbon-ad.message')}
        </Box>
        <Box fontWeight='medium' fontSize='xs' opacity={0.7}>
          {t('component.mdx-components.carbon-ad.ads-via-chakra-ui')}
        </Box>
      </Flex>
    </Flex>
  )
}
