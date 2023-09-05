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
import type { LoaderArgs, LinksFunction } from '@vercel/remix'
import { json } from '@vercel/remix'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import Feature from '~/components/Feature'
import Teaser from '~/components/Teaser'
import Grid from '~/components/Grid'
import Page from '~/components/Page'
import getEnv from './utils/get-env'
import { isStoryBlokPreview } from './utils/fetchStoryOnRoute'

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
export async function loader({ request }: LoaderArgs) {
  const isPreview = isStoryBlokPreview(request)

  return json({
    ENV: {
      STORYBLOK_ACESS_KEY: process.env.STORYBLOK_ACESS_KEY,
      STORYBLOK_PROD: isPreview,
    },
  })
}
export default function App() {
  const data = useLoaderData<typeof loader>()

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
