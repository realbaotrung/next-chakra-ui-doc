import { Flex, FlexProps, chakra } from '@chakra-ui/react'
import NextImage, { ImageLoaderProps, ImageProps } from 'next/image'

export const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (props) =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader',
      'layout',
      'onError',
    ].includes(props),
})

const toBase64 = (str: string) =>
  typeof window === 'undefined' // NOTE: Guard for server side rendering
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="${w}" height="${h}" fill="#75c5c0"  />
    <rect id="r" width="${w}" height="${h}" fill="#75c5c0"  />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality}`
}

export default function ChakraNextImage(props: ImageProps & FlexProps) {
  const { src, width, height, alt, quality, layout, ...rest } = props

  return (
    <Flex
      pos='relative'
      cursor='pointer'
      className='group'
      overflow='hidden'
      {...rest}
    >
      <ChakraNextUnwrappedImage
        w='auto'
        h='auto'
        loader={myLoader}
        width={width}
        height={height}
        quality={quality}
        layout={layout}
        placeholder='blur'
        objectFit='contain'
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(Number(width), Number(height)),
        )}`}
        src={src}
        alt={alt}
        transition='all 0.2s'
        // TODO: SHOULD CONSIDER FALLBACK IMAGE
        // https://stackoverflow.com/questions/66949606/what-is-the-best-way-to-have-a-fallback-image-in-nextjs
        // onError={(event => {console.log('event-----', event)})}
      />
    </Flex>
  )
}
