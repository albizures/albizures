import React from 'react';
import { config } from '../../config';
import Head from 'next/head';

interface Props {
	url: string;
	title?: string;
	description?: string;
}

export function TwitterCardMeta(props: Props) {
	const { url, title, description } = props;
	return (
		<Head>
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:site" content={config.twitter} />
			<meta
				property="twitter:url"
				content={config.site.baseUrl + url}
			/>
			<meta
				property="twitter:title"
				content={title ? [title, config.site.title].join(' | ') : ''}
			/>
			<meta
				property="twitter:description"
				content={description ? description : config.site.description}
			/>
		</Head>
	);
}
