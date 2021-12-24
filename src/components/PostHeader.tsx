import React from 'react';
import { format } from 'date-fns';

interface Props {
	title: string;
	cover: string;
	date: string;
	author: string;
	tags: string[];
}

export const PostHeader: React.FC<Props> = (props) => {
	const { title, date, tags } = props;
	return (
		<div className="post-header mb-8">
			<h1 className="text-4xl mb-2 font-bold">{title}</h1>
			<p className="text-primary opacity-50 text-sm">
				{format(new Date(date), 'dd-MM-yyyy')}
				{' - '}
				{tags.map((tag, index) => {
					return (
						<React.Fragment key={index}>
							<span className="text-inherit capitalize">{tag}</span>
							{index === tags.length - 1 ? '' : ', '}
						</React.Fragment>
					);
				})}
			</p>
		</div>
	);
};
