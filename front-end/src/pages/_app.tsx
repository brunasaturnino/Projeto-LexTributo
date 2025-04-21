import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global'; // 👈 Ajuste se estiver em outro lugar

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
