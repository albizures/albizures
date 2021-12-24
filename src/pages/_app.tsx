import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import anyConfig from '../../config.yml';
import { Config } from '../types';

const config = anyConfig as Config;

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>{config.site.title}</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
