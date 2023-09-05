import { storyblokEditable } from '@storyblok/react'

const Teaser = ({ blok, preview }) => {
  let storyblokPreviewProps = preview ? storyblokEditable(blok) : {}

  return <h2 {...storyblokPreviewProps}>{blok.headline}</h2>
}

export default Teaser
