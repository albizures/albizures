const withYaml = require('next-plugin-yaml');
const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require('@next/mdx')({
	extension: /\.mdx$/,
	options: {
		rehypePlugins: [rehypePrism],
	},
});

module.exports = withYaml(
	withMDX({
		pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
		experimental: { esmExternals: true },
		webpack(config) {
			config.module.rules.push({
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			});

			return config;
		},
	}),
);
