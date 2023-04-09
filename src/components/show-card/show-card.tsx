import { client } from '@/lib/sanity.client';
import { SanityDocument } from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import Image from 'next/image';
import React from 'react'
import { getArgentinaTimeZoneDate } from "@/lib/utility/parseDate";
import styles from './show-card.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '../basics/index';

const builder = imageUrlBuilder(client);

export const ShowCard = ({show}: {show: SanityDocument}) => {

  const startHour = getArgentinaTimeZoneDate(show.performances[0].date, "HH:mm")
  const date = getArgentinaTimeZoneDate(show.performances[0].date, "DD-MMM")
  
  const router = useRouter()
  return (
    <div className={styles.container}>
        <Image 
            src={builder.image(show.image).width(257).height(257).url()}
            width={257}
            height={257}
            alt={show.placeName}
            />
        <section className={styles.infoContainer}>
            <Link href={`show/${show.id.current}`}><p className={styles.showName}>{show.placeName}</p></Link>
            <div className={styles.dateContainer}>
              <p>{date}</p>
              <p>|</p>
              <p>{startHour}</p>
            </div>
            <p className={styles.location}>{show.locationAddress}</p>
            <section className={styles.shareContainer}>
              <p>Compartir</p>
              <div className={styles.icons}>
                <Image 
                  src={"/icons/facebook.png"}
                  width={19}
                  height={19}
                  alt={"share on facebook"}
                  style={{objectFit:'contain', aspectRatio: '1/1'}}
                  />
                  <Image 
                  src={"/icons/twitter.png"}
                  width={19}
                  height={19}
                  alt={"share on twitter"}
                  style={{objectFit:'contain', aspectRatio: '1/1'}}

                  />
                  <Image 
                  src={"/icons/linkedin.png"}
                  width={19}
                  height={19}
                  alt={"share on linkedin"}
                  style={{objectFit:'contain', aspectRatio: '1/1'}}
                  />
              </div>
            </section>
            <div className={styles.buttonContainer}>
              <Button text="COMPRA TUS ENTRADAS" className={styles.button} onClick={() => router.push(`${show.salesLink}`)}/>
            </div>
        </section>
    </div>
  )
}
