import { Doc, allDocs } from 'contentlayer/generated'
import { MixedArray, capitalize, toArray, uniq } from './js-utils'

function toCapitalized(str: string) {
  const result = capitalize(str)
  return result.replace(/-/g, ' ')
}

// ----------------------------------------------------------------------------

export function getDocByType(id: string) {
  return allDocs.filter((doc) => doc.slug.startsWith(`/docs/${id}`))
}

/** Route to: 'components' */
export const getGroupedComponents = () => {
  return getDocByType('components').reduce((acc, doc: Doc) => {
    const category = doc.category
    if (!category) return acc
    // if acc[toCapitalized(category)] = undefined | null, it will be assigned to []
    acc[toCapitalized(category)] ??= []
    acc[toCapitalized(category)].push(doc)
    return acc
  }, {} as Record<string, any[]>)
}

/** Helper for Tab 'Usage' in the MDX  */
export const getUsageDoc = (id: string) => {
  return allDocs.find((_doc: Doc) => _doc.id === id && _doc.scope === 'usage')
}

/** Helper for Tab 'Props' in the MDX  */
export const getPropsDoc = (id: string) => {
  return allDocs.find((_doc: Doc) => _doc.id === id && _doc.scope === 'props')
}

/** Helper for Tab 'Theming' in the MDX  */
export const getThemingDoc = (id: string) => {
  return allDocs.find((_doc: Doc) => _doc.id === id && _doc.scope === 'theming')
}

/** Helper for Tabs that has 'usage' & 'props' & 'theming' tabs */
export const getDocDoc = (slug: MixedArray): Doc | undefined => {
  const params = toArray(slug)
  const _slug = params.join('/')

  // Content when click to 'usage' tab
  const doc = allDocs.find(
    (doc) => doc.slug.endsWith(_slug) || doc.slug.endsWith(`${_slug}/usage`),
  ) as Doc | undefined

  if (!doc) return

  const isThemingTab = doc.scope === 'theming'
  const isPropsTab = doc.scope === 'props'

  // Content when click to 'theming' tab
  if (isThemingTab) {
    doc.frontMatter = {
      ...doc.frontMatter,
      ...(getUsageDoc(doc.id)?.frontMatter ?? {}),
      ...(getThemingDoc(doc.id)?.frontMatter ?? {}),
    }
  }

  // Content when click to 'props' tab
  if (isPropsTab) {
    doc.frontMatter = {
      ...doc.frontMatter,
      ...(getUsageDoc(doc.id)?.frontMatter ?? {}),
      ...(getPropsDoc(doc.id)?.frontMatter ?? {}),
    }
  }

  return doc
}

// ---------------------------------------------------------------------------

export function getComponentTabsData(slug: MixedArray) {
  const params = toArray(slug)
  const _slug = params.join('/')

  const getSlug = (id: string) => {
    const res = uniq([...params, id])
    if (res.length > 3) res.splice(2, 1)
    return res
  }

  const usageSlug = getSlug('usage')
  const propsSlug = getSlug('props')
  const themingSlug = getSlug('theming')

  const data = [
    {
      id: 'usage',
      match: _slug.endsWith('/usage') || params.length === 2, // should check magic number
      href: { query: { slug: usageSlug.slice(1) } },
      label: 'Usage',
      doc: getDocDoc(getSlug('usage')),
    },
    {
      id: 'props',
      match: _slug.endsWith('/props'),
      href: { query: { slug: propsSlug.slice(1) } },
      label: 'Props',
      doc: getDocDoc(getSlug('props')),
    },
    {
      id: 'theming',
      match: _slug.endsWith('/theming'),
      href: { query: { slug: themingSlug.slice(1) } },
      label: 'Theming',
      doc: getDocDoc(getSlug('theming')),
    },
  ]

  return data.filter((item) => item.doc)
}

export type TabsData = ReturnType<typeof getComponentTabsData>
