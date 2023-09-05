import { storyblokEditable } from '@storyblok/react'

const Feature = ({ blok, preview }) => {
  let storyblokPreviewProps = preview ? storyblokEditable(blok) : {}

  return (
    <div className="column feature" {...storyblokPreviewProps}>
      {blok.name}
    </div>
  )
}

export default Feature
