import type { AppProps } from 'next/app';
import Global from '../../styles/styles';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Global />
            <Component {...pageProps} />
        </>
    );
}
