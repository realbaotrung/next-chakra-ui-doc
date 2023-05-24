import { RouteItem, getRouteContext } from 'utils/get-route-context'
import gettingStartedSidebar from 'configs/getting-started.sidebar.json'
import styledSystemSidebar from 'configs/styled-system.sidebar.json'
import hooksSidebar from 'configs/hooks.sidebar.json'
import componentsSidebar from 'configs/components.sidebar.json'
import tutorialSidebar from 'configs/tutorial.sidebar.json'
import communitySidebar from 'configs/community.sidebar.json'
import figmaSidebar from 'configs/figma.sidebar.json'
import { Frontmatter } from 'src/types/frontmatter'
import { ReactNode } from 'react'
import { findRouteByPath, removeFromLast } from 'utils/find-route-by-path'
import PageContainer from 'components/page-container'
import Sidebar from 'components/sidebar/sidebar'
import Pagination from 'components/pagination'

export function getRoutes(slug: string): RouteItem[] {
  // for home page, use docs sidebar
  if (slug === '/') {
    return gettingStartedSidebar.routes as RouteItem[]
  }

  const configMap = {
    '/getting-started': gettingStartedSidebar,
    '/docs/styled-system': styledSystemSidebar,
    '/docs/hooks': hooksSidebar,
    '/docs/components': componentsSidebar,
    '/tutorials': tutorialSidebar,
    '/community': communitySidebar,
    '/figma': figmaSidebar,
  }

  const [, sidebar] = Object.entries(configMap).find(
    ([path]) => slug.startsWith(path) ?? [],
  )

  const routes = sidebar?.routes ?? []
  return routes as RouteItem[]
}

interface MDXLayoutProps {
  frontmatter: Frontmatter
  children: ReactNode
  hideToc?: boolean
  maxWidth?: string
}

export default function MDXLayout({ frontmatter, children, hideToc, maxWidth }: MDXLayoutProps) {
  const routes = getRoutes(frontmatter.slug)
  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  const routeContext = getRouteContext(route, routes)

  return (
    <PageContainer
      hideToc={hideToc}
      maxWidth={maxWidth}
      frontmatter={frontmatter}
      leftSidebar={<Sidebar routes={routes} />}
      pagination={
        <Pagination
          next={routeContext.nextRoute}
          previous={routeContext.prevRoute}
        />
      }
    >
      {children}
    </PageContainer>
  )
}


