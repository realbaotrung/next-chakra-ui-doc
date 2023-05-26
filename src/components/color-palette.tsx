import {
  Box,
  Flex,
  FlexProps,
  Grid,
  GridProps,
  useTheme,
} from '@chakra-ui/react'
import { FC } from 'react'

type ColorPaletteProps = {
  color?: string
  name?: string
} & FlexProps

export const ColorPalette = ({ color, name, ...rest }: ColorPaletteProps) => {
  const theme = useTheme()

  let colorCode = color
  const [shade, hue] = color.split('.')

  if (shade && hue) {
    colorCode = theme.colors[shade][hue]
  }

  if (color in theme.colors && typeof theme.colors[color] === 'string') {
    colorCode = theme.colors[color]
  }

  return (
    <Flex align='center' {...rest}>
      <Box
        borderRadius='md'
        boxSize='3rem'
        boxShadow='inner'
        mr={3}
        bgColor={color}
      >
        <Box fontSize='sm'>
          <Box fontWeight='semibold' textTransform='capitalize'>
            {name}
          </Box>
          <Box textTransform='uppercase'>{colorCode}</Box>
        </Box>
      </Box>
    </Flex>
  )
}

type ColorPalettesProps = {
  color: string
}

export const ColorPalettes = ({ color }: ColorPalettesProps) => {
  const theme = useTheme()

  const keys = Object.keys(theme.colors[color])

  return keys.map((item) => (
    <ColorPalette
      key={`${color}.${item}`}
      color={`${color}.${item}`}
      name={`${color} ${item}`}
    />
  ))
}

export const ColorWrapper = (props: GridProps) => (
  <Grid
    mt={7}
    gap={6}
    templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
    {...props}
  />
)
