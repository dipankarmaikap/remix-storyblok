# Remix Storyblok 

This directory is a brief example of a [Remix](https://remix.run/docs) site that can be deployed to Vercel with zero configuration.

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/remix&template=remix)

_Live Example: https://remix-run-template.vercel.app_

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so: Create a `.env` file and add the following two variables
```sh
STORYBLOK_ACESS_KEY=your Storyblok Preview Key
STORYBLOK_PREVIEW=true // Set it false in production
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!
