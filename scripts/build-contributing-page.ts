import { promises as fs } from 'fs'
import path from 'path'

/**
 * Purpose:
 * - Build file 'contributing.mdx at content/getting-started/contributing.mdx
 *
 * Run command:
 * - pnpm contributing:gen
 */


const ROOT_PATH = process.cwd()

async function buildContributingPage() {
  const contributingFile = (await fs.readFile(path.join(process.cwd(), 'CONTRIBUTING.md'))).toString()

  const mdxCompleteFile = `---
title: Contributing to Chakra UI
description:
  'Thanks for being interested in contributing! We want contributing to Chakra
  UI to be enjoyable, and educational for anyone and everyone'
tags: ['contributing']
---

${contributingFile}`

  await fs.writeFile(
    path.join(ROOT_PATH, 'content', 'getting-started', 'contributing.mdx'),
    mdxCompleteFile,
  )
}

try {
  buildContributingPage()
} catch (error) {
  console.log(error)
}
