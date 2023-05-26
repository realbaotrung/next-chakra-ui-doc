import styledSystemSidebar from 'configs/styled-system.sidebar.json'
import componentsSidebar from 'configs/components.sidebar.json'
import { ElementType, ReactNode } from 'react'
import {
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  RiArchiveFill,
  RiCheckboxMultipleFill,
  RiDashboardFill,
  RiEyeCloseLine,
  RiFeedbackFill,
  RiFileList3Fill,
  RiImage2Fill,
  RiInputMethodLine,
  RiLayout5Line,
  RiListOrdered,
  RiNavigationFill,
  RiPaletteLine,
  RiPictureInPictureExitFill,
  RiRepeat2Fill,
} from 'react-icons/ri'
import NextLink from 'next/link'

const featureSidebar = {
  '/docs/styled-system': styledSystemSidebar,
  '/docs/components': componentsSidebar,
}

type FeatureItemProps = {
  title: string
  icon: ElementType // why 'ElementType', because It lives inside <Icon as='...' />
  children: ReactNode
} & StackProps

function FeatureItem({ title, icon, children, ...props }: FeatureItemProps) {
  return (
    <Stack
      direction='row'
      bg='white'
      rounded='12px'
      shadow='base'
      spacing={4}
      p='6'
      cursor='pointer'
      _dark={{ bg: 'gray.700' }}
      {...props}
    >
      <Flex
        rounded='12px'
        w='12'
        h='12'
        bg='teal.500'
        align='center'
        justify='center'
      >
        <Icon as={icon} fontSize='24px' color='white'></Icon>
      </Flex>
      <Flex direction='column'>
        <Heading as='h3' size='sm' fontWeight='semibold' mt='1' mb='0.5'>
          {title}
        </Heading>
        <Text fontSize='md' opacity={0.7}>
          {children}
        </Text>
      </Flex>
    </Stack>
  )
}

export default function FeaturesOverview() {
  const { asPath } = useRouter()

  const features = featureSidebar[asPath].routes?.[0].routes.filter(
    (feature) => feature.path !== asPath,
  )

  const changeFeatureText = (path: string) => {
    switch (true) {
      case path.includes('recipes'):
        return 'recipes'
      case path.includes('hooks'):
        return 'hooks'
      default:
        return 'components'
    }
  }

  const icons = {
    Features: RiListOrdered,
    Theming: RiPaletteLine,
    'Utility Hooks': RiRepeat2Fill,
    'Component Hooks': RiRepeat2Fill,
    Recipes: RiFileList3Fill,
    Layout: RiLayout5Line,
    Forms: RiCheckboxMultipleFill,
    'Data Display': RiDashboardFill,
    Overlay: RiPictureInPictureExitFill,
    Feedback: RiFeedbackFill,
    Typography: RiInputMethodLine,
    Disclosure: RiEyeCloseLine,
    Navigation: RiNavigationFill,
    'Media and icons': RiImage2Fill,
    Other: RiArchiveFill,
  }

  return (
    <SimpleGrid mt='12' minChildWidth='15.625rem' spacing='8'>
      {features.map((feature) => (
        <NextLink
          key={feature.title}
          href={`${feature.routes?.[0].path}?scroll=true`}
          passHref
        >
          <FeatureItem
            icon={icons[feature.title] ?? null}
            title={feature.title}
          >
            {feature.summarize
              ? `${feature.routes.length} ${changeFeatureText(feature.path)}`
              : null}
          </FeatureItem>
        </NextLink>
      ))}
    </SimpleGrid>
  )
}
