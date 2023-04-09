import { client } from '@/lib/sanity.client';
import { PortableText } from '@portabletext/react';
import { SanityDocument } from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import Image from 'next/image';
import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { getArgentinaTimeZoneDate } from "@/lib/utility/parseDate";
import styles from './show-card.module.css'
const builder = imageUrlBuilder(client);
import { useRouter } from 'next/router';
import Link from 'next/link';



export const ShowCard = ({show}: {show: SanityDocument}) => {

  const startHour = getArgentinaTimeZoneDate(show.performances[0].date, "HH:mm")
  const date = getArgentinaTimeZoneDate(show.performances[0].date, "DD-MMM")
  
  const router = useRouter()
  return (
    <div className={styles.container} onClick={() => router.push(`show/${show.id.current}`)}>
        <Image 
            src={builder.image(show.image).width(300).height(300).url()}
            width={300}
            height={300}
            alt={show.placeName}
            />
        <section className={styles.infoContainer}>
            <Link href={`show/${show.id.current}`}><p className={styles.showName}>{show.placeName}</p></Link>
            <div className={styles.dateContainer}>{date} - {startHour}</div>
            <p className={styles.text}>{show.locationAddress}</p>
        </section>
    </div>
  )
}
