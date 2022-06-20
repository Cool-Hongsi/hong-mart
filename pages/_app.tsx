import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";
import { wrapper } from '../store';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Hong Mart</title>
        <meta name='description' content='Awesome Hong Mart' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <SessionProvider session={session}> {/* Wrapping in order to use session in child components */}
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </SessionProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp); // for using redux in NextJS
