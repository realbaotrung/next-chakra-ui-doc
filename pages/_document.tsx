import React from 'react'
import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

/**
 * About: _document.tsx:
 * https://www.webdevtutor.net/blog/what-is-the-document-file-in-nextjs
 */
class Document extends NextDocument {
  static getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx)
  }

  // FONT: public/fonts/Inter.woff2

  render() {
    return (
      <Html>
        <Head>
          <link
            rel='preload'
            href='/fonts/Inter.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document;
