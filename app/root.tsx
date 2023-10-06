import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type {
  LoaderFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@vercel/remix";
import { json } from "@vercel/remix";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "~/components/Feature";
import Teaser from "~/components/Teaser";
import Grid from "~/components/Grid";
import Page from "~/components/Page";
import getEnv from "~/utils/get-env";
import styles from "~/tailwind.css";
import { isStoryBlokPreview } from "~/utils/fetchStoryOnRoute";
let components = { feature: Feature, grid: Grid, teaser: Teaser, page: Page };

export const meta: MetaFunction = () => [{ title: "Remix Storyblok" }];
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
storyblokInit({
  accessToken: getEnv().STORYBLOK_ACESS_KEY,
  use: [apiPlugin],
  components,
  bridge: getEnv().STORYBLOK_PREVIEW?.toString() === "true" ?? false,
});
export async function loader({ request }: LoaderFunctionArgs) {
  //This will check if the website is in storyblok preview from the query parameter
  const isPreview = isStoryBlokPreview(request);
  return json({
    ENV: {
      STORYBLOK_ACESS_KEY: process.env.STORYBLOK_ACESS_KEY,
      STORYBLOK_PREVIEW: isPreview,
    },
  });
}
export default function App() {
  const data = useLoaderData<typeof loader>();

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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
      </body>
    </html>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    let title = `${error?.status} - ${error?.statusText}`;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>{title}</title>
          <Links />
        </head>
        <body>
          <div>
            <h1>Oops</h1>
            <p>Status: {error.status}</p>
            <p>{error.data.message}</p>
          </div>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
    </div>
  );
}
