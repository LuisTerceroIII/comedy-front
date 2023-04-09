import { SanityDocument } from "@sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";

const query = groq`*[_type == "show" && id.current == $id][0]`;

// Prepare Next.js to know which routes already exist
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "show" && defined(id.current)][]{
      "params": { "id": id.current }
    }`
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryParams = { id: params?.id ?? `` };
  const show = await client.fetch(query, queryParams);
  return {
    props: {
      data: { show },
    },
  };
};

export default function Page({ data } : {data: SanityDocument}) {
  
  const show = data.show
  return (
    <>
    Show page: {`show ${show.placeName} , id: ${show.id.current}`}
    </>
  )
}