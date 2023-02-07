import Document, { Head, Html, Main, NextScript } from 'next/document'
import { mediaStyles } from 'lib/media'

const ymID = process.env.YM_ID
const yandexMetrika = `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${ymID}, "init", {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true
});
`

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
          {/* https://docs.coollabs.io/fonts/how-to-use */}
          <link
            href="https://api.fonts.coollabs.io/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://api.fonts.coollabs.io/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500;1,700&display=swap"
            rel="stylesheet"
          />
          {/* <link href="https://api.fonts.coollabs.io/css2?family=Montserrat+Alternates&display=swap" rel="stylesheet" /> */}
          {/* <link href="https://api.fonts.coollabs.io/css2?family=Cormorant&display=swap" rel="stylesheet" /> */}
          {/* <link href="https://api.fonts.coollabs.io/css2?family=Cormorant+Infant&display=swap" rel="stylesheet" /> */}
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: yandexMetrika }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
