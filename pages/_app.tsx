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
        <meta charSet="utf-8" />
        <title>Hong Mart</title>
        <meta name='description' content='Awesome Hong Mart' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <SessionProvider session={session}> {/* 하위에서 session을 사용하기 위해 wrapping */}
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp);
