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
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@vercel/remix";
import { json } from "@vercel/remix";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import getEnv from "./utils/get-env";
import styles from "~/tailwind.css";
import { isStoryBlokPreview } from "./utils/fetchStoryOnRoute";
import {
  FallbackComponent,
  storyblokComponents,
} from "~/components/storyblokComponents";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

storyblokInit({
  accessToken: getEnv().STORYBLOK_ACESS_KEY,
  use: [apiPlugin],
  components: storyblokComponents,
  apiOptions: {
    region: "eu",
  },
  bridge: getEnv().STORYBLOK_PREVIEW?.toString() === "true" ?? false,
  enableFallbackComponent: true,
  customFallbackComponent: FallbackComponent,
});

export const meta: MetaFunction = () => [{ title: "Remix Storyblok" }];
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <Footer />
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
