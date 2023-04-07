// ./components/Movie.tsx

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { client } from "@/lib/sanity.client";
import Head from "next/head";

const builder = imageUrlBuilder(client);

export const Movie = ({ movie }: { movie: SanityDocument }) => {
  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <main>
        <h1>{movie.title}</h1>
        <Image
          src={builder.image(movie.poster).width(300).height(300).url()}
          width={300}
          height={300}
          alt={movie.title}
        />
        <PortableText value={movie.overview} />
      </main>
    </>
  );
}