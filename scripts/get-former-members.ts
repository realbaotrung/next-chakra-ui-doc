import { promises as fs } from 'fs'
import { config } from 'dotenv'
import { Octokit } from 'octokit'

/**
 * Purpose:
 * - Build file '.all-membersrc' at root folder
 *
 * Run command:
 * - pnpm former-members:gen
 */

// setup env variables
config()
// setup github API
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
// filename
const FILE_NAME = './.all-former-membersrc'
// config repo
const REPO_CONFIG = {
  mediaType: {
    format: 'raw',
  },
  owner: 'chakra-ui',
  repo: 'chakra-ui',
  path: '.notes/previous-maintainers.md',
}

export interface IFormerMember {
  name: string | null
  githubName: string | null
  components: string[] | null
}

// removes whitespace at the beginning and the end
const normalizeString = (s: string) => s.replace(/^\s+|\s+$/g, '')

// process and collect data of repo
const parseRepoData = (lines: string[]) => {
  const parsedData: IFormerMember[] = []

  lines.forEach((line) => {
    const segments = line.split('|').filter((segment) => segment !== '')

    const components = segments[1]
      .split(',')
      .map((component) => normalizeString(component) || null)

    parsedData.push({
      name:
        normalizeString(segments[0].slice(0, segments[0].indexOf('@'))) || null,
      githubName:
        normalizeString(segments[0].slice(segments[0].indexOf('@') + 1)) ||
        null,
      // avoid empty strings in the array
      components: components[0] ? components : null,
    })
  })

  return parsedData;
}

async function buildAllFormerMembers() {
  const { data } = await octokit.rest.repos.getContent(REPO_CONFIG)
  /////////////////////////////////////////////////////////////////////////////
  // --- Data ---
  // Here's a list previous maintainers who have helped grow Chakra UI but are no
  // longer on the team.
  //
  // | Maintainer Name                 | Components         |
  // | ------------------------------- | ------------------ |
  // | Kolawole Tioluwani @tioluwani94 | Styled System, CLI |
  // | Mark Chandler @with-heart       | Community, Triage  |
  //
  // > Feel free to open a PR to update this
  /////////////////////////////////////////////////////////////////////////////

  const tableLines: string[] = (data as any)
    .split('\n')
    .filter((line: string) => line.startsWith('|'))

  // remove 'table header' lines
  tableLines.splice(0, 2)

  /////////////////////////////////////////////////////////////////////////////
  // --- Table ---
  // [
  //   '| Kolawole Tioluwani @tioluwani94 | Styled System, CLI |',
  //   '| Mark Chandler @with-heart       | Community, Triage  |'
  // ]
  /////////////////////////////////////////////////////////////////////////////

  const result = parseRepoData(tableLines)

  /////////////////////////////////////////////////////////////////////////////
  // --- Result ---
  // [
  //   {
  //     name: 'Kolawole Tioluwani',
  //     githubName: 'tioluwani94',
  //     components: [ 'Styled System', 'CLI' ]
  //   },
  //   {
  //     name: 'Mark Chandler',
  //     githubName: 'with-heart',
  //     components: [ 'Community', 'Triage' ]
  //   }
  // ]
  /////////////////////////////////////////////////////////////////////////////

  // write file to the specified path
  await fs.writeFile(FILE_NAME, JSON.stringify(result, null, 2))
}

try {
  buildAllFormerMembers()
} catch (error) {
  console.log(error)
}
