import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { PostBody } from '../../components/post';
import { PostHeader } from '../../components/PostHeader';
import { markdownToHtml } from '../../html-to-string';
import { getAllPosts, getPostBySlug } from '../../posts';
import anyConfig from '../../../config.yml';
import { Config, Post } from '../../types';

const config = anyConfig as Config;

interface Props {
	missingItems: (keyof Post)[];
	post: Post;
}

const Post: React.FC<Props> = (props) => {
	const { post } = props;
	return (
		<Layout>
			<article className="mb-32">
				<Head>
					<title>
						{post.title} | {config.site.name}
					</title>
					{post.ogImage && (
						<meta property="og:image" content={post.ogImage.url} />
					)}
				</Head>
				<PostHeader
					title={post.title}
					cover={post.cover}
					date={post.date}
					author={post.author}
				/>
				<PostBody content={post.content} />
			</article>
		</Layout>
	);
};

export const getStaticProps = async ({ params }) => {
	const { items: post, missingItems } = getPostBySlug(params.slug);

	const content = await markdownToHtml(post.content || '');

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	};
};

export const getStaticPaths = async () => {
	const posts = getAllPosts();

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			};
		}),
		fallback: false,
	};
};

export default Post;
