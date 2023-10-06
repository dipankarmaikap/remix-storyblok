import { Link } from "@remix-run/react";
import { storyblokEditable } from "@storyblok/react";

export default function FeaturedPosts({ preview, blok }) {
  let storyblokPreviewProps = preview ? storyblokEditable(blok) : {};
  // console.log(blok);
  return (
    <section {...storyblokPreviewProps} className="container p-4 my-16">
      <h2 className="font-medium text-5xl">{blok?.headline}</h2>
      <p className="text-xl my-4">{blok?.description} </p>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-10 mt-8">
        {blok?.posts?.map((post) => (
          <div key={post.id} className="">
            <div className="mb-8">
              <img
                src={`${post.content.image.filename}/m/600x350`}
                alt={post.name}
              />
            </div>
            <div className="">
              <p className="text-xl">Typography</p>
              <Link
                className="font-medium text-3xl block my-2"
                to={post.full_slug}
              >
                {post.name}
              </Link>
              <p className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipiscing elit lobortis
                arcu enim urna adipiscing praesent velit viverra sit sempe.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
