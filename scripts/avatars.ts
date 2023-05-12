import { promises as fs } from 'fs'
import mkdirp from 'mkdirp'
import fetch from 'node-fetch'
import path from 'path'
import tweetsJson from '../configs/tweets.json'
import ImageCache from './image-cache'

/**
 * Purpose:
 * - Build avatars images  of { individualSponsors, companySponsors } at public/avatars
 * - Build file '.all-sponsorsrc' at root folder
 *
 * Run command:
 * - pnpm avatars:gen
 */

const { tweets } = tweetsJson

// path to folder: 'public'
const PUBLIC_DIR = path.join(process.cwd(), 'public')
// path to folder: 'public/avatars
const AVATARS_DIR = path.join(PUBLIC_DIR, 'avatars')
// filename
const FILE_NAME = '.all-sponsorsrc'

interface Sponsor {
  MemberId: number
  createdAt: string
  type: string
  role: string
  tier: string
  isActive: boolean
  totalAmountDonated: number
  currency: string
  lastTransactionAt: string
  lastTransactionAmount: number
  profile: string
  name: string
  company: string | null
  description: string | null
  image: string
  email: string | null
  twitter: string | null
  github: string | null
  website: string | null
}

/**
 * Get all the Open Collective sponsors and
 * arrange them into 'individuals' and 'organizations'
 */
async function getSponsors() {
  const response = await fetch(
    'https://opencollective.com/chakra-ui/members/all.json',
  )
  const unfilteredSponsors = (await response.json()) as Sponsor[]

  // filter the sponsors by openCollective profile to avoid double entries
  const sponsors = unfilteredSponsors.filter(
    (currentSponsor, index, allSponsors) =>
      index ===
      allSponsors.findIndex((s) => s.profile === currentSponsor.profile),
  )

  // Sponsors those are individuals
  const individuals = sponsors.filter(
    (sponsor) => sponsor.type === 'USER' && sponsor.image !== null,
  )

  // Sponsors those are companies
  const companies = sponsors.filter(
    (sponsor) => sponsor.type === 'ORGANIZATION',
  )

  return {
    individuals,
    companies,
  }
}

async function buildSponsors() {
  const { individuals, companies } = await getSponsors()

  // cache individual sponsor image and resize to '40px' width
  const individualAvatarsCache = new ImageCache({
    outputDirectory: AVATARS_DIR,
    width: 40,
  })

  // update the image property from open-collective to use the cached image
  const individualSponsors = await Promise.all(
    individuals.map(async (individual) => {
      const filename = await individualAvatarsCache.urlToFile(
        individual.image,
        individual.MemberId.toString(),
      )
      return {
        ...individual,
        image: `/avatars/${filename}`,
      }
    }),
  )

  // cache individual sponsor image and resize to '40px' width
  const companyAvatarsCache = new ImageCache({
    outputDirectory: AVATARS_DIR,
  })

  // update the image property from open-collective to use the cached image
  const companySponsors = await Promise.all(
    companies.map(async (company) => {
      const filename = await companyAvatarsCache.urlToFile(
        company.image,
        company.MemberId.toString(),
      )
      return {
        ...company,
        image: `/avatars/${filename}`,
      }
    }),
  )

  const data = {
    individuals: individualSponsors,
    companies: companySponsors,
  }

  // write file to the root folder
  await fs.writeFile(FILE_NAME, JSON.stringify(data, null, 2))
}

async function buildTweets() {
  const cache = new ImageCache({
    outputDirectory: AVATARS_DIR,
    width: 50,
  })

  await Promise.all(
    tweets.map(async (tweet) => {
      await cache.urlToFile(tweet.image, tweet.handle)
    }),
  )
}

async function buildAvatars() {
  // make sure the avatars directory exists
  await mkdirp(AVATARS_DIR)

  await Promise.all(
    [
      buildSponsors(),
      buildTweets(),
    ]
  )
}

try {
  buildAvatars()
} catch (error) {
  console.log(error)
}
