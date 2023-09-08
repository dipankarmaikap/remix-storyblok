import { getStoryblokApi } from "@storyblok/react";
import getEnv from "./get-env";

export function isStoryBlokPreview(request) {
  const url = new URL(request.url);
  return (
    getEnv().STORYBLOK_PREVIEW === "true" ||
    url.searchParams.has("_storyblok") ||
    url.searchParams.has("_preview")
  );
}
export const fetchStoryOnRoute = async ({ request, params }) => {
  const isPreview = isStoryBlokPreview(request);
  let slug = params["*"] ?? "home";
  const sbParams = {
    version: isPreview ? "draft" : "published",
    cv: await getStoryblokCacheVersion(isPreview),
  };

  const res = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams);
  return { story: res?.data?.story, isPreview };
};
async function getStoryblokCacheVersion(isPreview) {
  let timeValue = new Date().valueOf();
  if (!isPreview) {
    try {
      let res = await fetch(
        `https://api.storyblok.com/v1/cdn/spaces/me?token=${
          getEnv().STORYBLOK_ACESS_KEY
        }`
      );
      let data = await res.json();
      return data?.space?.version ?? timeValue;
    } catch (error) {
      return timeValue;
    }
  }

  return timeValue;
}
