import React from 'react';

interface Props {
	children: React.ReactNode;
}

export function PostTitle(props: Props) {
	const { children } = props;
	return (
		<h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
			{children}
		</h1>
	);
}
