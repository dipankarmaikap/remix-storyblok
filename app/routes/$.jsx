import { json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import { resolveRelations } from "~/utils/resolveRelations";
import { fetchStoryOnRoute } from "~/utils/fetchStoryOnRoute";
export const loader = async ({ params, request }) => {
  try {
    const data = await fetchStoryOnRoute({ request, params });
    if (data?.story) {
      return json(data);
    }
  } catch (e) {
    let error = JSON.parse(e);
    throw json(
      {
        message: `"${
          new URL(request.url).pathname
        }" does not exists in Storyblok.`,
      },
      { status: error?.status ?? 400, statusText: error?.message }
    );
  }
};
export const meta = () => [{ title: "Remix@Edge | New Remix App" }];
export default function CatchAllRoute() {
  const data = useLoaderData();
  let story = useStoryblokState(data.story, {
    resolveRelations,
  });
  return (
    <StoryblokComponent
      story={story}
      blok={story.content}
      preview={data.isPreview}
    />
  );
}
export const config = { runtime: "edge" };
