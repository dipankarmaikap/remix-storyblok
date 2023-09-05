import { storyblokEditable, StoryblokComponent } from '@storyblok/react'

const Grid = ({ blok, preview }) => {
  let storyblokPreviewProps = preview ? storyblokEditable(blok) : {}

  return (
    <div className="grid" {...storyblokPreviewProps}>
      {blok.columns.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  )
}

export default Grid
