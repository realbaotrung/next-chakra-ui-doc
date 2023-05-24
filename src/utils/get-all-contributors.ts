import path from 'path'
import {promises as fs} from 'fs'
import { Contributor } from 'src/types/github'

/**
 * Read contributors from `.all-contributorsrc` file
 * to avoid over-fetching from Github
 **/
export async function getAllContributors() {
  const contributorsRcPath = path.join(process.cwd(), '.all-contributorsrc')
  let contributors: Contributor[] | null = null

  try {
    const data = await fs.readFile(contributorsRcPath, { encoding: 'utf-8'})
    contributors = JSON.parse(data)?.contributors
  } catch (error) {
    console.log(error)
  }

  return contributors
}

// Testing code with:
// - npx tsx src/utils/get-all-contributors.ts
// try {
//  getAllContributors()
// } catch (error) {
//   console.log(error)
// }
