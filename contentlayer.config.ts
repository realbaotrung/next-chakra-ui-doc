import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";

import remarkEmoji from "remark-emoji";
import remarkSlug from "remark-slug";
import remarkGfm from "remark-gfm";
import siteConfig from './configs/site-config.json'

import { getTableOfContents } from "./src/utils/get-table-of-contents";
import { rehypeMdxCodeMeta } from "./src/utils/rehype-code-meta";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
};

/** Guides  - Document type */
const Guides = defineDocumentType(() => ({
  name: "Guides",
  filePathPattern: "getting-started/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    author: { type: "string" },
    category: { type: "string" },
  },
  computedFields: {
    ...computedFields,
    frontMatter: { // in 'get-search-meta.ts, from library: @docusaurus/utils
      type: "json",
      resolve: (doc) => ({
        title: doc.title,
        description: doc.description,
        tags: doc.tags,
        author: doc.author,
        slug: `/${doc._raw.flattenedPath}`,
        editUrl: `${siteConfig.repo.editUrl}/${doc._id}`,
        headings: getTableOfContents(doc.body.raw)
      }),
    },
  },
}));

/** Blogs  - Document type */
const Blogs = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    author: { type: 'string' },
    publishedDate: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    frontMatter: { // in 'get-search-meta.ts, from library: @docusaurus/utils
      type: 'json',
      resolve: (doc) => ({
        publishedDate: {
          raw: doc.publishedDate,
          iso: new Date(doc.publishedDate).toISOString(),
          text: new Date(doc.publishedDate).toDateString(),
        },
        author: doc.author,
        title: doc.title,
        description: doc.description,
        slug: `/${doc._raw.flattenedPath}`,
        editUrl: `${siteConfig.repo.editUrl}/${doc._id}`,
      }),
    },
  },
}))

/** Doc  - Document type */
const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: 'docs/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string' },
    package: { type: 'string' },
    description: { type: 'string' },
    id: { type: 'string' },
    scope: {
      type: 'enum',
      options: ['usage', 'theming', 'props'],
      default: 'usage',
    },
    version: { type: 'string' },
    author: { type: 'string' },
    video: { type: 'string' },
    category: { type: 'string' },
    aria: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    frontMatter: { // in 'get-search-meta.ts, from library: @docusaurus/utils
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        package: doc.package,
        description: doc.description,
        version: doc.version,
        slug: `/${doc._raw.flattenedPath}`,
        editUrl: `${siteConfig.repo.editUrl}/${doc._id}`,
        headings: getTableOfContents(doc.body.raw),
      }),
    },
  },
}))

/** Recipe  - Document type */
const Recipe = defineDocumentType(() => ({
  name: 'Recipe',
  filePathPattern: 'community/recipes/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    author: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    frontMatter: { // in 'get-search-meta.ts, from library: @docusaurus/utils
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        description: doc.description,
        tags: doc.tags,
        author: doc.author,
        slug: `/community/${doc._raw.flattenedPath}`,
        editUrl: `${siteConfig.repo.editUrl}/${doc._id}`,
        headings: getTableOfContents(doc.body.raw),
      }),
    },
  },
}))

/** Tutorial  - Document type */
const Tutorial = defineDocumentType(() => ({
  name: 'Tutorial',
  filePathPattern: 'tutorial/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    ...computedFields,
    frontMatter: { // in 'get-search-meta.ts, from library: @docusaurus/utils
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        description: doc.description,
        slug: `/${doc._raw.flattenedPath}`,
        editUrl: `${siteConfig.repo.editUrl}/${doc._id}`,
        headings: getTableOfContents(doc.body.raw),
      }),
    },
  },
}))

/** ChangeLog  - Document type */
const Changelog = defineDocumentType(() => ({
  name: 'Changelog',
  filePathPattern: 'changelog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    slug: { type: 'string' },
    version: { type: 'string' },
    releaseUrl: { type: 'string' },
    releaseDate: { type: 'string' },
  },
  computedFields: {
    frontMatter: { // in 'get-search-meta.ts, from library: @docusaurus/utils
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        description: doc.description,
        slug: '/changelog',
        version: doc.version,
      }),
    },
  },
}))

/** Figma  - Document type */
const Figma = defineDocumentType(() => ({
  name: 'Figma',
  filePathPattern: 'figma/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    frontMatter: { // in 'get-search-meta.ts, from library: @docusaurus/utils
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        description: doc.description,
        slug: `/figma/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

/** ContentLayer Config */
const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Guides, Blogs, Doc, Recipe, Tutorial, Changelog, Figma],
  mdx: {
    rehypePlugins: [rehypeMdxCodeMeta],
    remarkPlugins: [remarkEmoji, remarkGfm, remarkSlug]
  }
})

export default contentLayerConfig;
