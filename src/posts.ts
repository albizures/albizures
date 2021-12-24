import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { IncompletePost, MissingPostItems, Post } from './types';

const postsDirectory = join(process.cwd(), '_posts');

export const getPostSlugs = () => {
	return fs
		.readdirSync(postsDirectory)
		.filter((file) => {
			return file.includes('.mdx');
		})
		.map((file) => file.replace('.mdx', ''));
};

const requiredFields: MissingPostItems = [
	'slug',
	'title',
	'date',
	'author',
	'content',
];

export const getPostBySlug = (slug: string): IncompletePost => {
	const realSlug = slug.replace(/\.mdx$/, '');
	const fullPath = join(postsDirectory, `${realSlug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	const items = {
		...data,
		slug,
		content,
		url: `/${slug}`,
		date: String(data.date),
		tags:
			data.tags && Array.isArray(data.tags)
				? data.tags.map((t: string) => t.toLowerCase())
				: [],
	} as Post;
	const missingItems: MissingPostItems = [];

	requiredFields.forEach((field) => {
		if (!items[field]) {
			missingItems.push(field);
		}
	});

	return { items, missingItems };
};

export const getAllPosts = () => {
	const slugs = getPostSlugs();
	const posts = slugs
		.map((slug) => {
			const { items, missingItems } = getPostBySlug(slug);
			if (missingItems.length > 0) {
				throw new Error(
					`Missing ${missingItems.join(
						',',
					)} in frontmatter, check '${slug}'`,
				);
			}

			return items;
		})
		// sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
	return posts;
};
