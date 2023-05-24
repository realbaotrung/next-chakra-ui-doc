import { numberFormatter } from "./number-formatter"

// we only want to get the number of 'approximate member'
interface Response {
  "approximate_member_count": string
}

export async function getDiscordMembers() {
  let count = 5_100

  try {
    const data: Response = await fetch(
      'https://discord.com/api/v9/invites/chakra-ui?with_counts=true',
    ).then(res => res.json())
    count = Number(data.approximate_member_count)
  } catch (error) {
    count = 1
  }

  return {
    count,
    prettyCount: numberFormatter.format(count)
  }
}
