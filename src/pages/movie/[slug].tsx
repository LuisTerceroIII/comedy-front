import { SanityDocument } from "@sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import { Movie } from "../../components/index";

const query = groq`*[_type == "movie" && slug.current == $slug][0]{
  title,
  poster,
  overview
}`;

// Prepare Next.js to know which routes already exist
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "movie" && defined(slug.current)][]{
      "params": { "slug": slug.current }
    }`
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryParams = { slug: params?.slug ?? `` };
  const movie = await client.fetch(query, queryParams);
  return {
    props: {
      data: { movie },
    },
  };
};

export default function Page({ data }: { data: { movie: SanityDocument } }) {
  return <Movie movie={data.movie} />
}