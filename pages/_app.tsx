import Head from 'next/head'
import { getSeo } from 'utils/seo'

/**
 * About _app.tsx: https://www.webdevtutor.net/blog/what-is-the-app-file-in-nextjs
 *
 * NextSeo enables you to set some default SEO properties that
 * will appear on all pages without needing to include anything on them.
 * You can also override these on a page by page basis if needed.
 * Note: only use this in '_app.tsx'
 */
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'

const App = ({ Component, pageProps }) => {
  const seo = getSeo()

  return (
    <>
      {/* Setup header with base metadata */}
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel='icon' type='image/png' sizes='96x96' href='/favicon.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://static.cloudflareinsights.com' />
        <meta name='theme-color' content='#319795' />
        {/* Alternative to google analytics */}
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            defer
            data-domain='chakra-ui.com'
            src='https://plausible.io/js/plausible.js'
          />
        )}
      </Head>

      {/* Setup default seo here... */}
      <DefaultSeo {...seo}/>

      {/* Setup Chakra here... */}
      <ChakraProvider >
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App;
