import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import React from "react";
import { fetchStoryOnRoute } from "../utils/fetchStoryOnRoute";
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
export default function CatchAllRoute() {
  const data = useLoaderData();
  let story = useStoryblokState(data.story);
  console.log({ story });
  return <h1>Hello Remix</h1>;
  // return (
  //   <StoryblokComponent
  //     story={story}
  //     blok={story.content}
  //     preview={data.isPreview}
  //   />
  // );
}
