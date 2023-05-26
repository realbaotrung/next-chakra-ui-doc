import {
  chakra,
  Box,
  BoxProps,
  ListItem,
  OrderedList,
  useColorModeValue,
} from '@chakra-ui/react'
import { useScrollSpy } from 'src/hooks/use-scrollspy'
import { FrontmatterHeading } from 'src/types/frontmatter'
import { t } from 'utils/i18n'
import TocNav from './toc-nav'
import FigmaPluginAd from './figma-plugin-ad'
import { useMemo } from 'react'

type TableOfContentProps = {
  headings: FrontmatterHeading[]
} & BoxProps

/**
 * The Right Content of current page
 * Only show when, breakpoints >= 'xl' (80em, 1280px)
 * @param param0
 * @returns
 */
export default function TableOfContent({
  headings,
  ...rest
}: TableOfContentProps) {
  const headingIds = useMemo(() => {
    return headings.map(({ id }) => `[id="${id}"]`)
  }, [headings])

  const activeId = useScrollSpy(headingIds, {
    // The Bottom of root margin should be '-70%', if not,
    // the table of content will have the undesirable, the wrong activeId
    rootMargin: '0% 0% -70% 0%',
  })

  const linkColor = useColorModeValue('gray.600', 'gray.400')
  const linkHoverColor = useColorModeValue('gray.900', 'gray.600')

  return (
    <TocNav title={t('component.table-of-content.on-this-page')} {...rest}>
      <OrderedList spacing={1} ml='0' mt='4' styleType='none'>
        {headings.map(({ id, text, level }) => (
          <ListItem key={id} title={text} ml={level === 'h3' ? '4' : undefined}>
            <chakra.a
              py='1'
              display='block'
              fontWeight={id === activeId ? 'bold' : 'medium'}
              href={`#${id}`}
              // About aria-current = 'location'
              // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current#values
              aria-current={id === activeId ? 'location' : undefined}
              color={linkColor}
              _hover={{
                color: linkHoverColor,
              }}
            >
              {text}
            </chakra.a>
          </ListItem>
        ))}
      </OrderedList>

      <Box my='10'>
        <FigmaPluginAd medium='sidebar-ad' />
      </Box>
    </TocNav>
  )
}
