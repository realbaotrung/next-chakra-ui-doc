import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * Notify and execute callback function when route is changed
 * @param fn - callback function
 */
const useRouteChanged = (fn: () => void) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      fn()
      console.log('App is changing to: ', url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.on('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, fn])
}

export default useRouteChanged
