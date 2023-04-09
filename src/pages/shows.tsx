import { ShowCard } from "@/components/show-card/show-card";
import { client } from "@/lib/sanity.client";
import { SanityDocument } from "@sanity/client";
import { groq } from "next-sanity"
import styles from "../styles/shows.module.css"
import moment, { now } from "moment";

const query = groq`*[_type == "show" && defined(id.current) && performances[0].date > "${new Date().toISOString()}"] | order(performances[0].date asc)`

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
            <p className={styles.title}>Próximos Shows</p>
            <div className={styles.shows}>
                {shows}
            </div>
        </div>
    )
  }
  