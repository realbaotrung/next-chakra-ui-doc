import path from 'path'
import { promises as fs } from 'fs'
import { Member } from 'src/types/github'

/**
 * Read the profile/bio of each member from '.all-members' file
 * to avoid over-fetching from GitHub
 */
export async function getAllMembers() {
  const membersResourcePath = path.join(process.cwd(), '.all-membersrc')
  let memberList: Member[] | null = null

  try {
    const data = await fs.readFile(membersResourcePath, { encoding: 'utf-8' })
    const members: Member[] = JSON.parse(data)?.members
    const filters = ['christiannwamba']
    memberList = members.filter((m) => !filters.includes(m.login))
  } catch (error) {
    console.log(error)
  }

  return memberList
}

// for Testing code only
// npx tsx src/utils/get-all-members.ts
// try {
//   getAllMembers()
// } catch (error) {
//   console.log(error)
// }
