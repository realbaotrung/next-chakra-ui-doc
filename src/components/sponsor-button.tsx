import { Box, BoxProps, Icon } from "@chakra-ui/react";
import siteConfig from 'configs/site-config.json'
import {FaHeart} from 'react-icons/fa'
import {t} from 'src/utils/i18n'

const SponsorButton = (props: BoxProps) => (
  <Box
    aria-label='Sponsor Chakra UI on Open Collective'
    as='a'
    href={siteConfig.openCollective.url}
    target='_blank'
    rel='noopener noreferrer'
    display={{ base: 'none', lg: 'flex'}}
    sx={{
      alignItems: 'center',
      bg: 'gray.50',
      borderWidth: '1px',
      borderColor: 'gray.200',
      borderRadius: 'md',
      px: '1em',
      minH: '36px',
      fontSize: 'sm',
      color: 'gray.800',
      outline: '0',
      transition: 'all 0.3s',
      _hover: {
        bg: 'gray.100',
        borderColor: 'gray.300',
      },
      _active: {
        borderColor: 'gray.200',
      },
      _focus: {
        boxShadow: 'outline',
      }
    }}
    {...props}
  >
    <Icon as={FaHeart} w='4' h='4' color='red.500' mr='2'/>
    <Box as='strong' lineHeight='inherit' fontWeight='semibold'>
      {t('component.sponsor-button.sponsor')}
    </Box>
  </Box>
)

export default SponsorButton
