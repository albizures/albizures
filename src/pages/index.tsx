import React from 'react';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { getAllPosts } from '../posts';
import { config } from '../config';
import { Post } from '../types';

interface SectionTitleProps {
	children: React.ReactNode;
}

function SectionTitle(props: SectionTitleProps) {
	const { children } = props;
	return (
		<h3 className="text-3xl pb-4 font-bold font-sans border-solid border-b border-gray-400 text-neutral-content">
			{children}
		</h3>
	);
}

interface PageLinkProps {
	href: string;
	children: React.ReactNode;
	target?: '_blank';
}

function PageLink(props: PageLinkProps) {
	const { href, children, target } = props;
	return (
		<Link href={href}>
			<a target={target} className="link link-hover text-primary">
				{children}
			</a>
		</Link>
	);
}

interface SectionProps {
	children: React.ReactNode;
}

function Section(props: SectionProps) {
	const { children } = props;
	return <section className="mt-8">{children}</section>;
}

interface SectionItemProps {
	children: React.ReactNode;
}

function SectionItem(props: SectionItemProps) {
	const { children } = props;
	return <li className="mb-2 font-light">{children}</li>;
}

function BuildSection() {
	const page = config.pages.find((page) => page.url === '/building');

	if (!page || !page.showInHome) {
		return null;
	}

	return (
		<Section>
			<SectionTitle>{page.fullLabel}</SectionTitle>
			<ul className="list-inside list-disc mt-4">
				<SectionItem>
					<PageLink
						target="_blank"
						href="https://thisweekingodot.com/"
					>
						This Week in Godot - A Newsletter About Godot Engine
					</PageLink>
				</SectionItem>
				<SectionItem>
					<PageLink target="_blank" href="https://pixore.vercel.app">
						Pixore - A Web Base Pixel Art Editor
					</PageLink>
				</SectionItem>
				<SectionItem>
					<PageLink
						target="_blank"
						href="https://github.com/albizures/plata"
					>
						Plata.js - A 1kb JS Library For Building User Interfaces
					</PageLink>
				</SectionItem>
				<SectionItem>
					<PageLink target="_blank" href="https://ruian.now.sh">
						Ruian - A Russian Grammar cheatsheet
					</PageLink>
				</SectionItem>
			</ul>
		</Section>
	);
}

interface BlogSectionProps {
	posts: Post[];
}

function BlogSection(props: BlogSectionProps) {
	const page = config.pages.find((page) => page.url === '/blog');
	const posts = props.posts.filter(
		(post) => !post.tags.includes('draft'),
	);

	if (!page || !page.showInHome || posts.length === 0) {
		return null;
	}

	return (
		<Section>
			<SectionTitle>{page.fullLabel}</SectionTitle>
			<ul className="list-inside list-disc mt-4">
				{posts.map((post) => {
					return (
						<SectionItem key={post.slug}>
							<PageLink href={`${page.url}/${post.slug}`}>
								{post.title}
							</PageLink>
						</SectionItem>
					);
				})}
			</ul>
		</Section>
	);
}

interface Props {
	allPosts: Post[];
	children: React.ReactNode;
}

function Index(props: Props) {
	return (
		<Layout>
			<h2 className="text-4xl text-neutral-content mb-4 font-bold">
				Hi. 👋🏻
			</h2>
			<p className="text-2xl font-light text-primary">
				{config.site.description}
			</p>
			<BuildSection />
			<BlogSection posts={props.allPosts} />
		</Layout>
	);
}

export async function getStaticProps() {
	const allPosts = getAllPosts();

	return {
		props: { allPosts },
	};
}

export default Index;
