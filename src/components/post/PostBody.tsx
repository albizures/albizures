import React from 'react';
import classNames from 'classnames';
import styles from './post.module.css';

interface Props {
	content: string;
}

export function PostBody(props: Props) {
	const { content } = props;
	return (
		<div className="max-w-2xl mx-auto">
			<div
				className={classNames(
					'post-content',
					styles['post-content'],
					'prose',
					'prose-code:bg-neutral-focus prose-code:text-secondary-content prose-code:italic prose-code:font-thin',
					'prose-a:link prose-a:text-base-content prose-a:font-normal',
					'prose-em:text-accent-content prose-em:italic',
					'prose-strong:text-accent-content',
					'prose-headings:text-secondary-content',
					'prose-p:text-secondary-content prose-p:font-light',
					'prose-li:text-secondary-content prose-li:py-0 prose-li:my-0',
					'prose-table:table prose-table:table-zebra',
					'prose-ul:list-inside prose-ul:list-disc',
					'prose-pre:p-0 prose-pre:pb-4',
				)}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	);
}
