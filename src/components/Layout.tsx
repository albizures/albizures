import React from 'react';
import { Header } from '../components/Header';
import { Footer } from './Footer';

export const Layout: React.FC = (props) => {
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
};
