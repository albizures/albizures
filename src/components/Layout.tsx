import React from 'react';
import { Header } from '../components/Header';
import { Footer } from './Footer';

interface Props {
	children: React.ReactNode;
}

export function Layout(props: Props) {
	const { children } = props;
	return (
		<>
			<Header />
			<main className="container px-2 max-w-screen-md mt-8">
				{children}
			</main>
			<Footer />
		</>
	);
}
