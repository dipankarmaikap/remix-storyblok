import { storyblokEditable } from "@storyblok/react";

export default function HeroSection({ blok, preview }) {
  let storyblokPreviewProps = preview ? storyblokEditable(blok) : {};
  return (
    <section className="bg-red-50">
      <div
        className="container px-4 py-24 md:py-28 flex flex-col items-center text-center"
        {...storyblokPreviewProps}
      >
        <img
          className="rounded-full"
          src={`${blok.image.filename}/m/150x150`}
          alt="Dipankar Maikap"
        />
        <h1 className="text-5xl md:text-6xl my-4 leading-tight md:leading-tight font-medium">
          {blok.headline}
        </h1>
        <p className="text-xl">{blok?.description}</p>
      </div>
    </section>
  );
}
// eslint-disable-next-line no-lone-blocks
{
  /* <section className="bg-red-50">
<div
  className="container px-4 pb-16 pt-8 md:py-16 lg:py-20 flex flex-wrap md:flex-nowrap items-center gap-6"
  {...storyblokPreviewProps}
>
  <div className="w-full md:w-1/2 lg:w-2/5">
    <h1 className="text-5xl md:text-6xl mb-8 leading-tight md:leading-tight font-medium">
      {blok.headline}
    </h1>
    <p className="text-xl">{blok?.description}</p>
  </div>
  <div className="w-full md:w-1/2 lg:w-3/5 flex items-center md:justify-center order-first md:order-last">
    <img
      className="rounded-full"
      src={`${blok.image.filename}/m/150x150`}
      alt="Dipankar Maikap"
    />
  </div>
</div>
</section> */
}
