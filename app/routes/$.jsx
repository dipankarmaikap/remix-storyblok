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
    } else {
      throw new Response(`${new URL(request.url).pathname} not found`, {
        status: 404,
      })
    }
  } catch (error) {
    throw new Response(`Failed to fetch ${new URL(request.url).pathname}`, {
      status: 500,
    })
  }
}
export default function CatchAllRoute() {
  const data = useLoaderData()
  let story = useStoryblokState(data.story)
  return (
    <StoryblokComponent
      story={story}
      blok={story.content}
      preview={data.isPreview}
    />
  )
}
