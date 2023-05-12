import { promises as fs } from 'fs'
import path from 'path'
import {
  fileToPath,
  parseMarkdownString,
  posixPath,
  removePrefix
} from '@docusaurus/utils'
import prettier from 'prettier'

// Generate a markdown TOC (table of contents) with Remarkable.
import toc from 'markdown-toc'
// ShellJS - portable (Windows/Linux/OS X) implementation of Unix shell commands for Node.js
import shell from 'shelljs'

/**
 * Purpose:
 * - Build file at './configs/search-meta.json'
 *
 * Run command:
 * - pnpm search-meta:gen
 */

const ROOT_PATH = process.cwd()
const FOLDER_CONTENT = 'content'
const FOLDER_CONFIGS = 'configs'
const FILE_NAME = 'search-meta.json'

interface ResultType {
  content: string
  id: string
  url: string
  type: 'lvl1' | 'lvl2' | 'lvl3'
  hierarchy: {
    lvl1: string | null
    lvl2?: string | null
    lvl3?: string | null
  }
}

interface TOCResultItem {
  content: string
  slug: string
  lvl: 1 | 2 | 3
  i: number
  seen: number
}

const getMdxMeta = async (file: string) => {
  // For windows:
  // Convert Windows backslash paths to posix style paths.
  // E.g: endi\lie -> endi/lie
  const filePath = posixPath(file);
  const rootPath = posixPath(ROOT_PATH)

  const markdownStr = (await fs.readFile(filePath)).toString()

  const { content, frontMatter: _frontMatter } = parseMarkdownString(markdownStr)

  /**
   * File:
   * /Users/realbaotrung/WorkingDirectory/nextjs-learning/chakra-ui/content/docs/components/range-slider/usage.mdx
   *
   * "content": is the content of file
   * "frontMatter" at the beginning of each '.mdx' file:
   * ---
   * id: range-slider
   * category: form
   * title: Range Slider
   * package: '@chakra-ui/slider'
   * description:
   *   'The RangeSlider is a multi thumb slider used to select a range of related
   *   values.'
   * video: 'https://youtu.be/yt0F8srvg_Q'
   * ---
   */

  const frontMatter = _frontMatter as Record<string, any>
  const tableOfContent = toc(content)

  const json = tableOfContent.json as TOCResultItem[]
  const slug = fileToPath(filePath).replace(`/${FOLDER_CONTENT}`, '').replace(rootPath, '')

  // ----------------------------
  const result: ResultType[] = []

  result.push({
    content: frontMatter.title,
    id: slug,
    type: 'lvl1',
    url: removePrefix(slug, '/'),
    hierarchy: {
      lvl1: frontMatter.title,
    }
  })

  json.forEach((item, index) => {
    result.push({
      content: item.content,
      id: slug,
      type: `lvl${item.lvl}` as any,
      url: removePrefix(slug, '/') + `#${item.slug}`,
      hierarchy: {
        lvl1: frontMatter.title,
        lvl2: item.lvl === 2 ? item.content : json[index - 1]?.content ?? null,
        lvl3: item.lvl === 3 ? item.content : null,
      },
    })
  })

  return result;
}

async function buildSearchMeta() {
  let json: any = []

  // Array of paths of all files (with '.mdx') in 'content' folder
  const files = shell
    .ls('-R', FOLDER_CONTENT)
    .map((file: string) => path.join(ROOT_PATH, FOLDER_CONTENT, file))
    .filter((file: string) => file.endsWith('.mdx'))

  /**
   * File paths to not be included in the search meta.
   * This can be overall page sections (i.e. "/docs", "/tutorial", etc.) or specific files. (i.e. "/guides/first-steps")
   */
  const excludedSlugs = ['/tutorial']

  for (const file of files) {
    let result: any[] = []

    // Windows OS: ensure file paths have forward slashes.
    const fileToPosixPath = posixPath(file)

    const isExcluded = !!excludedSlugs.find((excludedSlug) =>
      fileToPosixPath.includes(excludedSlug),
    )

    try {
      result = isExcluded ? [] : await getMdxMeta(file)
      json.push(...result)
    } catch (error) {
      console.log(error)
    }
  }

  // format json
  json = prettier.format(JSON.stringify(json), { parser: 'json' })

  const outPath = path.join(ROOT_PATH, FOLDER_CONFIGS, FILE_NAME)

  // write file
  await fs.writeFile(outPath, json)
  console.log('Search meta is ready ✅')
}

try {
  buildSearchMeta()
} catch (error) {
  console.log(error)
}
