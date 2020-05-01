/** @jsx jsx */
import { jsx } from 'theme-ui';
import BlogListItem from '@lekoarts/gatsby-theme-minimal-blog/src/components/blog-list-item';

type ListingProps = {
	posts: {
		slug: string;
		title: string;
		date: string;
		excerpt: string;
		description: string;
		timeToRead: number;
		tags?: {
			name: string;
			slug: string;
		}[];
	}[];
	className?: string;
	showTags?: boolean;
	mb?: number | number[];
};

const Listing = ({ posts, className, showTags = true, mb }: ListingProps) => (
	<section sx={{ mb: mb || [5, 6, 7] }} className={className}>
		{posts
			.filter((post) => {
				if (!Array.isArray(post.tags)) {
					return true;
				}

				return (
					post.tags.findIndex((tag) => {
						return tag.slug === 'draft';
					}) === -1
				);
			})
			.map((post) => (
				<BlogListItem key={post.slug} post={post} showTags={showTags} />
			))}
	</section>
);

export default Listing;
