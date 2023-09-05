import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import React from 'react'
import { fetchStoryOnRoute } from '../utils/fetchStoryOnRoute'
export const loader = async ({ params, request }) => {
  try {
    const data = await fetchStoryOnRoute({ request, params })
    if (data.story) {
      return json(data)
    }
  } catch (error) {
    throw new Response(`${new URL(request.url).pathname} not found`, {
      status: 404,
    })
  }
}
export default function CatchAllRoute() {
  let { data } = useLoaderData()
  let story = useStoryblokState(data.story)
  return (
    <div>
      <h1>Hello Catch all Route</h1>
      <StoryblokComponent blok={story.content} preview={data.isPreview} />
    </div>
  )
}
