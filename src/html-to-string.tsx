import React from 'react';
import gfm from 'remark-gfm';
import visit from 'unist-util-visit';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import { evaluate, EvaluateOptions } from '@mdx-js/mdx';
import { renderToStaticMarkup } from 'react-dom/server';
import { Pre } from './components/Pre';

function rehypeMetaAsAttributes() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			//@ts-ignore
			if (node.tagName === 'code' && node.data && node.data.meta) {
				(node.data.meta as string)
					.split(' ')
					.map((prop) => {
						return prop.split('=');
					})
					.forEach(([name, value = true]) => {
						//@ts-ignore
						node.properties[name] = value;
					});
			}
		});
	};
}

const components = {
	pre: Pre,
};

export async function markdownToHtml(markdown: string) {
	const compiled = await evaluate(markdown, {
		...(runtime as EvaluateOptions),
		useDynamicImport: true,
		rehypePlugins: [rehypeMetaAsAttributes],
		remarkPlugins: [gfm],
	});
	return renderToStaticMarkup(
		<MDXProvider components={components}>
			<compiled.default components={components} />
		</MDXProvider>,
	);
}
