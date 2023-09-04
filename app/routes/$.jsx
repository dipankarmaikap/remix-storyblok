import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react'
import React from 'react'
export const loader = async ({ params }) => {
  let slug = params['*'] ?? 'home'
  // console.log({ slug })
  let sbParams = {
    version: 'published',
    cv: Date.now(), //You can adjust this based on your liking for each env
  }
  let preview = process.env.STORYBLOK_PROD !== 'true'
  if (preview) {
    sbParams.version = 'draft'
  }

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams)
  return json(data?.story)
}
export default function CatchAllRoute() {
  let story = useLoaderData()
  story = useStoryblokState(story)
  return (
    <div>
      <h1>Hello Catch all Route</h1>
      <StoryblokComponent blok={story.content} />
    </div>
  )
}
