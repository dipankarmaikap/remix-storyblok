import { storyblokEditable, StoryblokComponent } from '@storyblok/react'

const Page = ({ blok, preview }) => {
  let storyblokPreviewProps = preview ? storyblokEditable(blok) : {}
  const { _uid, component, page_title_alternative } = blok || {}
  console.log({ blok })
  return (
    <div className={`blok-${component}`} {...storyblokPreviewProps} key={_uid}>
      {page_title_alternative}
    </div>
  )

  return (
    <main {...storyblokPreviewProps}>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent
          preview={preview}
          blok={nestedBlok}
          key={nestedBlok._uid}
        />
      ))}
    </main>
  )
}

export default Page
