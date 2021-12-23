import React from 'react';
import styles from '../styles/post.module.css';

export const PostTitle: React.FC = (props) => {
	const { children } = props;
	return (
		<h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
			{children}
		</h1>
	);
};

export function PostBody({ content }) {
	return (
		<div className="max-w-2xl mx-auto">
			<div
				className={styles['post-content']}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	);
}
