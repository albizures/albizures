import React from 'react';

interface Props {
	title: string;
	cover: string;
	date: string;
	author: string;
}

export const PostHeader: React.FC<Props> = (props) => {
	const { title } = props;
	return (
		<div className="post-header">
			<h1>{title}</h1>
		</div>
	);
};
