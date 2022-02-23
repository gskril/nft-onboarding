import Head from 'next/head'
import Hero from '../components/hero'

export default function Layout({children}) {
  return (
    <>
      <Hero />
      <main>{children}</main>
    </>
  )
}