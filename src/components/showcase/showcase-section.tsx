import {
  chakra,
  Box,
  Container,
  VStack,
  Button,
  SimpleGrid,
} from '@chakra-ui/react'
import showcaseJson from 'configs/showcase.json'
import NextLink from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { t } from 'utils/i18n'
import ShowcaseItem from './showcase-item'

const websites = showcaseJson.data.slice(0, 8)

export default function ShowcaseSection() {
  return (
    <Container as='section' py='7.5rem' mb='12' maxW='1280px'>
      <VStack w='full' spacing='7.5rem'>
        {/* Group showcase with title, description and button */}

        <Box maxW='760px' mx='auto' textAlign='center'>
          <chakra.h2 textStyle='heading' mb='4'>
            {t('homepage.built-with-chakra-section.title')}
          </chakra.h2>
          <chakra.p opacity={0.7} fontSize='lg' mb='8'>
            {t('homepage.built-with-chakra-section.description')}
          </chakra.p>
          <NextLink href='/showcase' passHref>
            <Button
              as='a'
              h='4rem'
              px='40px'
              size='lg'
              colorScheme='teal'
              fontSize='1.2rem'
              rightIcon={<FaArrowRight fontSize='0.8em' />}
            >
              {t('homepage.built-with-chakra-section.see-showcase')}
            </Button>
          </NextLink>
        </Box>

        {/* Show 8 case studies */}

        <SimpleGrid columns={{ base: 1, md: 2 }} gap='8' w='full'>
          {websites.map(({ name, image, url }) => (
            <ShowcaseItem key={url} name={name} image={image} url={url} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}
