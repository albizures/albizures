import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { PostBody } from '../../components/post/PostBody';
import { PostHeader } from '../../components/PostHeader';
import { markdownToHtml } from '../../html-to-string';
import { BasicMeta } from '../../components/meta/BasicMeta';
import { TwitterCardMeta } from '../../components/meta/TwitterCardMeta';
import { getAllPosts, getPostBySlug } from '../../posts';
import { Post } from '../../types';

interface Props {
	missingItems: (keyof Post)[];
	post: Post;
}

const Post: React.FC<Props> = (props) => {
	const { post } = props;
	return (
		<Layout>
			<article className="mb-32">
				<BasicMeta {...post} />
				<TwitterCardMeta {...post} />
				<Head>
					{post.ogImage && (
						<meta property="og:image" content={post.ogImage.url} />
					)}
				</Head>
				<PostHeader
					title={post.title}
					cover={post.cover}
					date={post.date}
					author={post.author}
					tags={post.tags}
				/>
				<PostBody content={post.content} />
			</article>
		</Layout>
	);
};

export const getStaticProps = async ({ params }) => {
	const { items: post } = getPostBySlug(params.slug);

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
