import { ShowCard } from "@/components/show-card/show-card";
import { client } from "@/lib/sanity.client";
import { SanityDocument } from "@sanity/client";
import { groq } from "next-sanity"
import styles from "../styles/shows.module.css"

const query = groq`*[_type == "show" && defined(id.current)]`

export const getStaticProps = async () => {
    const data = await client.fetch(query)
    return { props: { data } }
}

export default function Shows(props:any) {

    const { data } = props

    const shows = data.map((show: SanityDocument)  => {
        return <ShowCard key={show._id} show={show}/>
    })
    return (
        <div className={styles.showsContainer}>
            Shows
            {shows}
        </div>
    )
  }
  