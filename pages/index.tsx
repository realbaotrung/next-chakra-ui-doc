import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  BoxProps,
  Stack,
  chakra,
  Button,
  Center,
  Divider,
  Wrap,
  WrapItem,
  Link,
  Grid,
  SimpleGrid,
  LightMode,
  Circle,
} from '@chakra-ui/react'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import Header from 'components/header'
import SEO from 'components/seo'
import { Member, Sponsor } from 'src/types/github'
import { t } from 'utils/i18n'
import NextLink from 'next/link'
import { FaArrowRight, FaDiscord, FaMicrophone } from 'react-icons/fa'
import { DiGithubBadge } from 'react-icons/di'
import siteConfig from 'configs/site-config.json'
import Container from 'components/container'
import ChakraNextImage from 'components/chakra-next-image'
import users from 'chakra-users'
import SandpackEmbed from 'components/sandpack-embed'
import { App, Index } from 'configs/sandpack-contents/homepage/files'
import { MdAccessibility, MdGrain, MdPalette } from 'react-icons/md'
import { ElementType, ReactNode } from 'react'
import { IoMdMoon } from 'react-icons/io'
import { AiFillThunderbolt } from 'react-icons/ai'
import ShowcaseSection from 'components/showcase/showcase-section'
import { FiDownload, FiGithub, FiUsers } from 'react-icons/fi'
import { getGithubStars } from 'utils/get-github.starts'
import { getNpmDownloads } from 'utils/get-npm-downloads'
import { getDiscordMembers } from 'utils/get-discord-members'
import { getAllContributors } from 'utils/get-all-contributors'
import { getAllMembers } from 'utils/get-all-members'
import { getAllSponsors } from 'utils/get-all-sponsors'
import { chunk } from '@chakra-ui/utils'
import tweets from 'configs/tweets.json'
import TweetCard from 'components/tweet-card'
import ChakraProAd from 'components/chakra-pro/home-page-ad'
import DiscordStrip from 'components/discord-strip'
import Footer from 'components/footer'

type FeatureProps = {
  title: string
  icon: ElementType
  children: ReactNode
} & BoxProps

const Feature = ({ title, icon, children, ...props }: FeatureProps) => {
  return (
    <Box
      bg='white'
      rounded='12px'
      shadow='base'
      p='40px'
      _dark={{ bg: 'gray.700' }}
      {...props}
    >
      <Flex
        rounded='full'
        w='12'
        h='12'
        bg='teal.500'
        align='center'
        justify='center'
      >
        <Icon fontSize='24px' color='white' as={icon} />
      </Flex>
      <Heading as='h3' size='md' fontWeight='semibold' mt='1em' mb='0.5em'>
        {title}
      </Heading>
      <Text fontSize='lg' opacity={0.7}>
        {children}
      </Text>
    </Box>
  )
}

interface Tweet {
  content: string
  handle: string
  name: string
  date: string
  image: string
  url: string
}

interface StatBoxProps extends BoxProps {
  icon?: React.ElementType
  title: string
  description: string
}

const StatBox = (props: StatBoxProps) => {
  const { icon: StatIcon, title, description, ...rest } = props
  return (
    <Flex
      direction='column'
      align={{ base: 'center', md: 'flex-start' }}
      pl={{ base: '0', md: '8' }}
      borderLeft='2px solid'
      borderLeftColor='yellow.200'
      {...rest}
    >
      <Box fontSize={{ base: '4rem', md: '6rem' }} lineHeight='1em' mb='20px'>
        {title}
      </Box>
      <Stack isInline align='center'>
        <StatIcon size='24px' />
        <Text>{description}</Text>
      </Stack>
    </Flex>
  )
}

interface HomePageProps {
  members: Member[]
  githubStars: string
  npmDownloads: string
  discordMembers: string
  sponsors: {
    companies: Sponsor[]
    individuals: Sponsor[]
  }
}

const HomePage = ({
  members,
  sponsors,
  githubStars,
  npmDownloads,
  discordMembers,
}: HomePageProps) => (
  <>
    {/* Support SEO for homepage */}
    <SEO
      title={t('homepage.seo.title')}
      description={t('homepage.seo.description')}
    />
    {/* Advertising banner at homepage */}
    <AdBanner />
    {/* Header with Logo, Search bar, action buttons or Hamburger */}
    <Header />
    {/* Main content of page */}
    <Box mb={20}>
      {/* ---------------------------------------------------------- */}
      {/* Section: homepage */}
      {/* ---------------------------------------------------------- */}
      <Box
        as='section'
        aria-label='Main typo of homepage'
        pt='6rem'
        pb={{ base: '0', md: '5rem' }}
      >
        <Container>
          <Box textAlign={'center'}>
            {/* Heading typo at homepage */}
            <chakra.h1
              maxW='16ch'
              mx='auto'
              mb='16px'
              lineHeight='1.2'
              letterSpacing='tighter'
              fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
              fontFamily='heading'
              fontWeight='extrabold'
            >
              {t('homepage.title.main')}
              <Box as='span' color='teal.500' _dark={{ color: 'teal.300' }}>
                {' '}
                {t('homepage.title.highlighted')}
              </Box>
            </chakra.h1>
            {/* Paragraph at homepage */}
            <Text
              maxW='560px'
              mx='auto'
              color='gray.500'
              _dark={{ color: 'gray.400' }}
              fontSize={{ base: 'lg', lg: 'xl' }}
              mt='6'
            >
              {t('homepage.message')}
            </Text>

            {/* Group Action Buttons "Getting started | Github" */}
            <Stack
              mt='10'
              spacing='4'
              justify='center'
              direction={{ base: 'column', sm: 'row' }}
            >
              <NextLink href='/getting-started' passHref>
                <Button
                  as='a'
                  h='4rem'
                  px='40px'
                  fontSize='1.2rem'
                  size='lg'
                  colorScheme='teal'
                  rightIcon={<FaArrowRight fontSize='0.8em' />}
                >
                  {t('homepage.get-started')}
                </Button>
              </NextLink>
              <Button
                as='a'
                h='4rem'
                px='40px'
                fontSize='1.2rem'
                size='lg'
                href={siteConfig.repo.url}
                target='__black'
                leftIcon={<DiGithubBadge fontSize='1.5em' />}
              >
                GitHub
              </Button>
            </Stack>
          </Box>

          {/* ---------------------------------------------------------- */}
          {/* Git nation Badge */}
          {/* ---------------------------------------------------------- */}
          <Center>
            <Box
              display='inline-block'
              mt='70px'
              rounded='xl'
              bg='green.50'
              shadow='base'
              px='6'
              py='4'
            >
              <ChakraNextImage
                height={55}
                width={240}
                src='/git-nation-badge.png'
                alt='Git Nations Award for the most impactful project to the community'
              />
            </Box>
          </Center>
        </Container>
      </Box>

      {/* ---------------------------------------------------------- */}
      <Divider />
      {/* ---------------------------------------------------------- */}

      {/* ---------------------------------------------------------- */}
      {/* Section: Supported and Backed by */}
      {/* ---------------------------------------------------------- */}

      <Box as='section' aria-label='Supporter or Backer' pt='48px' pb='32px'>
        <Container textAlign='center'>
          <chakra.p
            fontWeight='500'
            textStyle='caps'
            color='teal.600'
            _dark={{ color: 'teal.300' }}
            mb='48px'
          >
            {t('homepage.supported-and-backed-by')}
          </chakra.p>

          <Wrap
            maxW='800px'
            mx='auto'
            justify='center'
            align='center'
            spacing='24px'
          >
            {users
              .filter((user) => user.image.includes('.'))
              .slice(0, 7)
              .map((user) => (
                <WrapItem key={user.name} bg='white' rounded='md'>
                  <Link href={user.url}>
                    <ChakraNextImage
                      src={user.image}
                      alt={user.name}
                      width={120}
                      height={24}
                      p='5'
                      loading='lazy'
                    />
                  </Link>
                </WrapItem>
              ))}
            {/* You company with heart */}
            <WrapItem>
              <Button
                as='a'
                w='40'
                h='16'
                href={`${siteConfig.openCollective.url}/contribute`}
                target='_blank'
                rel='noopener'
                border='1px dashed'
                borderColor='teal.200'
                rounded='md'
                bg='teal.50'
                _hover={{
                  bg: 'teal.100',
                }}
                _dark={{
                  borderColor: 'teal.500',
                  bg: 'whiteAlpha.200',
                  _hover: { bg: 'whiteAlpha.300' },
                }}
              >
                <Box as='span' mr='1' role='img'>
                  💖
                </Box>{' '}
                {t('homepage.your-company')}
              </Button>
            </WrapItem>
          </Wrap>
        </Container>
      </Box>

      {/* ---------------------------------------------------------- */}
      {/* Section: Less code more speed + Sandpack (codesandbox) */}
      {/* ---------------------------------------------------------- */}

      <Box as='section' aria-label='Less code more speed'>
        <Container py='80px'>
          {/* --- Typography --- */}
          <Box mb='3em' textAlign='center'>
            {/* Heading */}
            <chakra.h2 textStyle='heading'>
              {t('homepage.less-code-more-speed')}
            </chakra.h2>
            {/* Description */}
            <Text opacity={0.7} fontSize='lg' mt='3' mx='auto' maxW='600px'>
              {t('homepage.less-code-description')}
            </Text>
          </Box>
          {/* --- Sandpack - Codesandbox --- */}
          <Box
            maxW='7xl'
            mx='auto'
            mb='-300px' // It will have the background color of the next <Box /> >section
            px={{ base: '4', md: 0 }}
            position='relative'
          >
            <SandpackEmbed
              files={{
                '/App.tsx': App,
                '/index.tsx': Index,
              }}
              previewOptions={{
                zIndex: 0,
              }}
              isHorizontal
            />
          </Box>
        </Container>
      </Box>

      {/* ---------------------------------------------------------- */}
      {/* Section: feature section - Experimental */}
      {/* ---------------------------------------------------------- */}

      <Box
        as='section'
        aria-label='experimental feature'
        pt='240px'
        bg='gray.50'
        _dark={{ bg: 'gray.900' }}
      >
        <Container py='120px' maxW='1280px'>
          <Box maxW='760px' mx='auto' textAlign='center' mb='56px'>
            <chakra.h2 textStyle='heading' mb='5'>
              {t('homepage.feature-section.title')}
            </chakra.h2>
            <chakra.p opacity={0.7} fontSize='lg'>
              {t('homepage.feature-section.description')}
            </chakra.p>
          </Box>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            gap={10}
            px={{ md: 12 }}
          >
            <Feature
              icon={MdAccessibility}
              title={t('homepage.feature-section.accessible.title')}
            >
              {t('homepage.feature-section.accessible.description')}
            </Feature>
            <Feature
              icon={MdPalette}
              title={t('homepage.feature-section.themeable.title')}
            >
              {t('homepage.feature-section.themeable.description')}
            </Feature>
            <Feature
              icon={MdGrain}
              title={t('homepage.feature-section.composable.title')}
            >
              {t('homepage.feature-section.composable.description')}
            </Feature>
            <Feature
              icon={IoMdMoon}
              title={t('homepage.feature-section.light-and-dark-ui.title')}
            >
              {t('homepage.feature-section.light-and-dark-ui.description')}
            </Feature>
            <Feature
              icon={AiFillThunderbolt}
              title={t('homepage.feature-section.developer-experience.title')}
            >
              {t('homepage.feature-section.developer-experience.description')}
            </Feature>
            <Feature
              icon={FaDiscord}
              title={t('homepage.feature-section.active-community.title')}
            >
              {t('homepage.feature-section.active-community.description')}
            </Feature>
          </Grid>
        </Container>
      </Box>

      {/* ---------------------------------------------------------- */}
      {/* Section: Showcase */}
      {/* ---------------------------------------------------------- */}

      <ShowcaseSection />

      {/* ---------------------------------------------------------- */}
      {/* Section: Analytics - Growing section */}
      {/* ---------------------------------------------------------- */}

      <Box as='section' aria-label='growing section' bg='teal.500'>
        <Container py='7.5rem' maxW='1280px' color='white'>
          {/* Group of Title and Description */}
          <Box maxW='760px' mx='auto' textAlign='center' mb='56px'>
            <chakra.h2 textStyle='heading' mb='5'>
              {t('homepage.growing-section.title')}
            </chakra.h2>
            <chakra.p opacity={0.7} fontSize='lg'>
              {t('homepage.growing-section.description')}
            </chakra.p>
          </Box>
          {/* Group of Analytics numbers */}
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            maxW='880px'
            mx='auto'
            spacing='4rem'
            px={{ md: 12 }}
          >
            <StatBox
              icon={FiDownload}
              title={npmDownloads}
              description={t('homepage.growing-section.downloads-per-month')}
            />
            <StatBox
              icon={FiGithub}
              title={githubStars}
              description={t('homepage.growing-section.github-stars')}
            />
            <StatBox
              icon={FiUsers}
              title={members.length.toString()}
              description={t('homepage.growing-section.core-contributors')}
            />
            <StatBox
              icon={FaDiscord}
              title={discordMembers}
              description={t('homepage.growing-section.discord-members')}
            />
          </SimpleGrid>
          {/* Group of chakra heroes */}
          <Box mt='5rem' textAlign='center'>
            <chakra.p mb='48px' textStyle='caps'>
              {t('homepage.growing-section.chakra-heroes')}
            </chakra.p>
            <Wrap spacing='4' justify='center' maxW='660px' mx='auto'>
              {members.map((i) => (
                <WrapItem key={i.login}>
                  <Link href={i.url}>
                    <ChakraNextImage
                      alt={i.name}
                      src={i.avatar_url}
                      width={80}
                      height={80}
                      rounded='full'
                      loading='lazy'
                    />
                  </Link>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Container>
      </Box>

      {/* ---------------------------------------------------------- */}
      {/* Section: Loved by product people section */}
      {/* ---------------------------------------------------------- */}

      <Box as='section' aria-label='loved by product people like you'>
        <Container py='120px' maxW='1200px' px='32px'>
          <chakra.h2 textStyle='heading-2' mb='48px'>
            {t('homepage.loved-by-product-people-section.title')}
          </chakra.h2>
          {/* ------------------------------------------------------------*/}
          {/*
           * This code below: from an array => with (chunk) we create
           * a list of 3 arrays, with each array holds its own tweets
           */}
          {/* ------------------------------------------------------------*/}
          <SimpleGrid spacing='32px' columns={{ base: 1, md: 3 }}>
            {chunk(tweets.tweets, 3).map((tweetList, idx) => (
              <Stack key={idx} spacing='6'>
                {tweetList.map((tweet: Tweet, idx) => (
                  <TweetCard key={idx} {...tweet} />
                ))}
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ---------------------------------------------------------- */}
      {/* Section: Support chakra ui */}
      {/* ---------------------------------------------------------- */}

      <Box as='section' aria-label='support chakra ui' bg='teal.500'>
        <Container py='120px' maxW='1200px' px='32px' color='white'>
          <Box maxW='560px' mx='auto' textAlign='center' mb='56px'>
            <chakra.h2 textStyle='heading-2' mb='4'>
              {t('homepage.support-chakra-ui-section.title')}
            </chakra.h2>
            <chakra.p fontSize='lg' opacity={0.7}>
              {t('homepage.support-chakra-ui-section.description')}
            </chakra.p>
          </Box>

          {/* --- Open Collective Sponsor - Card --- */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            maxW='600px'
            mx='auto'
            bg='white'
            color='gray.800'
            shadow='md'
            rounded='lg'
            p='6'
          >
            <Stack flex='1' isInline spacing='6' pr={{ base: 0, md: '4' }}>
              {/* Card Avatar - on the left */}
              <Icon h='40px' w='40px' viewBox='0 0 32 32'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M29.1531 6.8877C30.948 9.47379 31.9999 12.614 31.9999 16.0003C31.9999 19.3866 30.948 22.5271 29.1531 25.1129L25.0085 20.9684C25.8225 19.4957 26.2858 17.8019 26.2858 16.0003C26.2858 14.1987 25.8225 12.5052 25.0085 11.0325L29.1531 6.8877Z'
                  fill='#8FC7FF'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M25.1126 2.84685L20.9678 6.99138C19.4951 6.17745 17.8016 5.71417 16 5.71417C10.3194 5.71417 5.71418 10.3194 5.71418 16C5.71418 21.6806 10.3194 26.2858 16 26.2858C17.8016 26.2858 19.4951 25.8226 20.9678 25.0086L25.1126 29.1532C22.5265 30.948 19.3863 32 16 32C7.16352 32 0 24.8365 0 16C0 7.16351 7.16352 0 16 0C19.3863 0 22.5265 1.05197 25.1126 2.84685Z'
                  fill='#297EFF'
                />
              </Icon>
              {/* Card Content - in the middle */}
              <Box flex='1'>
                <Text fontSize='lg' fontWeight='bold' mt='-1'>
                  {t(
                    'homepage.support-chakra-ui-section.open-collective-title',
                  )}
                </Text>
                <Text opacity={0.7}>
                  {t(
                    'homepage.support-chakra-ui-section.sponsor-the-chakra-ui-maintainers',
                  )}
                </Text>
              </Box>
            </Stack>
            {/* Locks the color mode to `light` */}
            <LightMode>
              <Button
                w={{ base: '100%', md: 'auto' }}
                alignSelf='center'
                minW='7rem'
                colorScheme='teal'
                as='a'
                href={siteConfig.openCollective.url}
                rel='noopener'
                target='_blank'
              >
                {t('homepage.support-chakra-ui-section.sponsor')}
              </Button>
            </LightMode>
          </Stack>

          {/* --- Patreon Sponsor - Card --- */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            maxW='600px'
            mx='auto'
            bg='white'
            color='gray.800'
            shadow='md'
            rounded='lg'
            mt='6'
            p='6'
          >
            <Stack flex='1' isInline spacing='6' pr={{ base: 0, md: '4' }}>
              {/* Card Avatar - on the left */}
              <Icon w='40px' h='40px' viewBox='0 0 569 546'>
                <g>
                  <circle
                    cx='362.589996'
                    cy='204.589996'
                    r='204.589996'
                    fill='#f96854'
                  />
                  <rect
                    fill='#052d49'
                    height='545.799988'
                    width='100'
                    x='0'
                    y='0'
                  />
                </g>
              </Icon>
              {/* Card Content - in the middle */}
              <Box flex='1'>
                <Text fontSize='lg' fontWeight='bold' mt='-1'>
                  {t('homepage.support-chakra-ui-section.patreon-title')}
                </Text>
                <Text opacity={0.7}>
                  {t('homepage.support-chakra-ui-section.sponsor-the-creator')}
                </Text>
              </Box>
            </Stack>
            {/* Locks the color mode to `light` */}
            <LightMode>
              <Button
                w={{ base: '100%', md: 'auto' }}
                alignSelf='center'
                minW='7rem'
                colorScheme='teal'
                as='a'
                href={siteConfig.patreon.url}
                rel='noopener'
                target='_blank'
              >
                {t('homepage.support-chakra-ui-section.sponsor')}
              </Button>
            </LightMode>
          </Stack>

          {/* --- Organization Sponsors --- */}
          <Box maxW='600px' mx='auto' textAlign='center'>
            <chakra.p textStyle='caps' mb='8' mt='4rem'>
              {t('homepage.support-chakra-ui-section.organization-sponsors')}
            </chakra.p>
            <Wrap justify='center'>
              {sponsors.companies.map((i) => (
                <WrapItem key={i.MemberId}>
                  <Circle
                    size='80px'
                    bg='white'
                    shadow='lg'
                    as='a'
                    href={i.website}
                    target='_blank'
                    rel='noopener'
                  >
                    <ChakraNextImage
                      rounded='full'
                      width={56}
                      height={56}
                      alt={i.name}
                      src={i.image}
                      loading='lazy'
                    />
                  </Circle>
                </WrapItem>
              ))}
            </Wrap>
          </Box>

          {/* --- Individual Sponsors --- */}
          <Box maxW='600px' mx='auto' textAlign='center'>
            <chakra.p textStyle='caps' mb='8' mt='4rem'>
              {t('homepage.support-chakra-ui-section.individual-sponsors')}
            </chakra.p>
            <Wrap justify='center'>
              {sponsors.individuals.map((i) => (
                <WrapItem key={i.MemberId}>
                  <Link href={i.profile} target='_blank' rel='noopener'>
                    <ChakraNextImage
                      src={i.image}
                      alt={i.name}
                      width={40}
                      height={40}
                      rounded='full'
                      loading='lazy'
                    />
                  </Link>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Container>
      </Box>

      {/* ---------------------------------------------------------- */}
      {/* Section: Chakra Pro Advertisement */}
      {/* ---------------------------------------------------------- */}

      <ChakraProAd />

      {/* ---------------------------------------------------------- */}
      {/* Section: Event */}
      {/* ---------------------------------------------------------- */}

      {/* Set Audio bar background at the bottom center for this section */}
      <Box
        as='section'
        aria-label='event'
        bgImage='url(/audio-bar.svg)'
        bgPos='bottom center'
        bgSize='120px'
        bgRepeat='space no-repeat'
      >
        <Container
          pt='7.5rem'
          pb='10rem'
          maxW='50rem'
          mx='auto'
          textAlign='center'
        >
          <Flex direction='column' align='center' maxW='600px' mx='auto'>
            {/* Microphone Icon */}
            <Circle size='80px' bg='blackAlpha.200' color='teal.400'>
              <FaMicrophone size='40px' />
            </Circle>

            {/* Main title and description */}
            <chakra.h2 textStyle='heading' mt='6' mb='6'>
              {t('homepage.event-section.title')}
            </chakra.h2>
            <chakra.p opacity={0.7} mb='40px' fontSize='lg'>
              {t('homepage.event-section.description')}
            </chakra.p>

            {/* Button action: mail to */}
            <Button
              as='a'
              href='mailto:sage@adebayosegun.com?subject=Invitation to Speak!'
              h='4rem'
              px='40px'
              fontSize='1.2rem'
              size='lg'
              colorScheme='teal'
              rightIcon={<FaArrowRight fontSize='0.8em' />}
            >
              {t('homepage.event-section.invite-us-to-speak')}
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* ---------------------------------------------------------- */}
      {/* Section: Discord community */}
      {/* ---------------------------------------------------------- */}
      <DiscordStrip />

      {/* ---------------------------------------------------------- */}
      {/* Section: Footer */}
      {/* ---------------------------------------------------------- */}
      <Footer />

    </Box>
  </>
)

export async function getStaticProps() {
  const [
    { prettyCount: githubStars },
    { prettyCount: npmDownloads },
    { prettyCount: discordMembers },
  ] = await Promise.all([
    getGithubStars(),
    getNpmDownloads(),
    getDiscordMembers(),
  ])

  const [contributors, members, sponsors] = await Promise.all([
    getAllContributors(),
    getAllMembers(),
    getAllSponsors(),
  ])

  return {
    props: {
      githubStars,
      npmDownloads,
      discordMembers,
      contributors,
      members,
      sponsors,
    },
  }
}

export default HomePage
