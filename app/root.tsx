import { cssBundleHref } from '@remix-run/css-bundle'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { Analytics } from '@vercel/analytics/react'
import { json, type LinksFunction } from '@vercel/remix'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import Feature from '~/components/Feature'
import Teaser from '~/components/Teaser'
import Grid from '~/components/Grid'
import Page from '~/components/Page'
import getEnv from './utils/get-env'
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]
let components = { feature: Feature, grid: Grid, teaser: Teaser, page: Page }
storyblokInit({
  accessToken: getEnv().STORYBLOK_ACESS_KEY,
  use: [apiPlugin],
  components,
  bridge: getEnv().STORYBLOK_PROD !== 'true',
})
export async function loader() {
  return json({
    ENV: {
      STORYBLOK_ACESS_KEY: process.env.STORYBLOK_ACESS_KEY,
      STORYBLOK_PROD: process.env.STORYBLOK_PROD,
    },
  })
}
export default function App() {
  const data = useLoaderData<typeof loader>()

  // if (true) {
  //   storyblokInit({
  //     accessToken: 'W1vLyxT5rQ15jBpANjnv0gtt',
  //     use: [apiPlugin],
  //     components,
  //   })
  // }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
      </body>
    </html>
  )
}
