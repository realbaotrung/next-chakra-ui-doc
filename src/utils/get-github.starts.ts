import { Octokit } from 'octokit'
import { config } from 'dotenv'
import { numberFormatter } from './number-formatter'

// setup env variables
config()
// setup octokit for github api
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

// "https://api.npms.io/v2/package/@chakra-ui%2Freact"
export async function getGithubStars() {
  let count: number

  try {
    const repo = await octokit.rest.repos.get({
      owner: 'chakra-ui',
      repo: 'chakra-ui',
    })
    count = repo.data.stargazers_count
  } catch (error) {
    count = 19_700
  }

  return {
    count,
    prettyCount: numberFormatter.format(count)
  }
}
