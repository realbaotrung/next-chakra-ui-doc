import { numberFormatter } from "./number-formatter"

interface Response {
  downloads: string,
  start: Date | string
  end: Date | string,
  package: string
}

export async function getNpmDownloads() {
  let count = 817_000

  try {
    const data: Response = await fetch(
      'https://api.npmjs.org/downloads/point/last-month/@chakra-ui/react',
    ).then(res => res.json())
    count = Number(data.downloads)
  } catch (error) {
    console.log('Failed to get npm downloads: ', error.toString())
  }

  return {
    count,
    prettyCount: numberFormatter.format(count)
  }
}
