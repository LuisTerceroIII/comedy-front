import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Barlow } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const barlow = Barlow({
  weight: ['300', '400'],
  subsets: ['latin'],
  style: 'normal'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${barlow.className} ${inter.className}`}>
      <Component {...pageProps} />
    </main>
  )
}
