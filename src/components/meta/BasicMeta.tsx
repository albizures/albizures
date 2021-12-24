import React from 'react';
import Head from 'next/head';
import { config } from '../../config';

type Props = {
	title?: string;
	description?: string;
	keywords?: string[];
	author?: string;
	url: string;
};

export const BasicMeta: React.FC<Props> = (props) => {
	const { url } = props;

	const description = props.description
		? props.description
		: config.site.description;
	const title = props.title
		? [props.title, config.site.title].join(' | ')
		: config.site.title;
	const keywords = props.keywords
		? props.keywords.join(',')
		: config.site.keywords.map((keyword) => keyword).join(',');
	const author = props.author ? (
		<meta name="author" content={props.author} />
	) : null;
	const canonical = config.site.baseUrl + url;

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			{author}
			<link rel="canonical" href={canonical} />
		</Head>
	);
};
