import path from 'path'
import { promises as fs } from 'fs'
import { Sponsor } from 'src/types/github'

/**
 * Read the profile/bio of each member from '.all-sponsorsrc' file
 * to avoid over-fetching from GitHub
 */
export async function getAllSponsors() {
  const sponsorsResourcePath = path.join(process.cwd(), '.all-sponsorsrc')
  let sponsorCollection: {
    individuals: Sponsor[]
    companies: Sponsor[]
  } | null = null

  try {
    const data = await fs.readFile(sponsorsResourcePath, { encoding: 'utf-8' })
    sponsorCollection = JSON.parse(data)
  } catch (error) {
    console.log(error)
  }

  return sponsorCollection
}

// for Testing code only
// npx tsx src/utils/get-all-sponsors.ts
// try {
//   getAllSponsors()
// } catch (error) {
//   console.log(error)
// }
