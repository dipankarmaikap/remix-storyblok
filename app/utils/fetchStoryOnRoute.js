import { getStoryblokApi } from '@storyblok/react'

export function isStoryBlokPreview(request) {
  const url = new URL(request.url)
  return url.searchParams.has('_storyblok') || url.searchParams.has('_preview')
}
export const fetchStoryOnRoute = async ({ request, params }) => {
  const isPreview = isStoryBlokPreview(request)
  let slug = params['*'] ?? 'home'
  const sbParams = {
    version: isPreview ? 'draft' : 'published',
    cv: new Date().valueOf(),
  }

  const res = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams)
  return { story: res?.data?.story, isPreview }
}
