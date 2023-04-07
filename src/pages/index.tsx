import { groq } from "next-sanity";
import type { SanityDocument } from "@sanity/client";
import { client } from "../lib/sanity.client";
import {Movies} from "../components/index";

const query = groq`*[_type == "movie" && defined(slug.current)]{
  _id,
  title, 
  slug
}`;

export const getStaticProps = async () => {
  const data = await client.fetch(query);

  return { props: { data } };
};

export default function Home({ data }: { data: SanityDocument[] }) {
  return <Movies movies={data} />
}