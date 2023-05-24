import { Box, chakra } from '@chakra-ui/react'
import NextImage from 'next/image'

type TweetCardProps = {
  name: string
  image: string
  handle: string
  date: string
  url: string
  content: string
}

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      'src', 'alt', 'layout', 'loading',
      'onError'
  ].includes(prop),
})

export default function TweetCard({
  name,
  handle,
  date,
  url,
  content,
}: TweetCardProps) {
  const image = `/avatars/${handle}.jpg`

  return (
    <Box
      as='a'
      href={url}
      target='_blank'
      rel='noopener'
      display='flex'
      rounded='lg'
      p='5'
      mb='4'
      bg='white'
      _dark={{ bg: 'gray.700' }}
      shadow='base'
    >
      <Box
        as='span'
        display='inline-flex'
        alignItems='center'
        flexShrink='0'
        mr='16px'
        width='8'
        height='8'
        position='relative'
      >
        <ChakraNextUnwrappedImage
          src={image}
          alt={name}
          layout='fill'
          rounded='full'
          loading='lazy'
          // TODO: SHOULD CONSIDER FALLBACK IMAGE
          // https://stackoverflow.com/questions/66949606/what-is-the-best-way-to-have-a-fallback-image-in-nextjs
          // onError={(event => {console.log('event-----', event)})}
        />
      </Box>

      <Box fontSize='sm'>
        <p>
          {name}{' '}
          <Box as='span' opacity={0.7}>
            {handle} · {date}
          </Box>
        </p>
      <Box
        as='p'
        mt='2'
        dangerouslySetInnerHTML={{
          __html: content.replace(/--/g, '<br /><br />'),
        }}
      ></Box>
      </Box>
    </Box>
  )
}
