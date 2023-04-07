// ./components/Movies.tsx

import Link from "next/link";
import type { SanityDocument } from "@sanity/client";
import Head from "next/head";

export const Movies = ({ movies }: { movies: SanityDocument[] }) => {

  const moviesRows = movies.map((movie) => {
      return (
        <Link key={movie._id} href={`movie/${movie.slug.current}`} >
          <h2>{movie.title}</h2>
        </Link>
      )
  })
  return (
    <>
      <Head>
        <title>{movies.length} Movies</title>
      </Head>
      <main>
        {moviesRows}
      </main>
    </>
  );
}