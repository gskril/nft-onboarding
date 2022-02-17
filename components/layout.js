import Head from 'next/head'

export default function Layout({children}) {
  return (
    <>
      <Head>
        <title>Test page</title>
      </Head>
      <main>{children}</main>
    </>
  )
}