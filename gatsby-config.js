require(`dotenv`).config({
	path: `.env`,
});

module.exports = {
	siteMetadata: {
		siteTitle: `Jose Albizures`,
		siteTitleAlt: `Jose Albizures - Web developer`,
		siteDescription: 'Jose Albizures - Web developer',
		siteHeadline: 'Jose Albizures - Web developer',
		siteUrl: 'http://albizures.com',
		author: `@_albizures`,
		siteLanguage: `en`,
	},
	plugins: [
		{
			resolve: `@lekoarts/gatsby-theme-minimal-blog`,
			options: {
				feed: false,
				navigation: [
					{
						title: `Blog`,
						slug: `/blog`,
					},
				],
				externalLinks: [
					{
						name: `Github`,
						url: `https://github.com/albizures`,
					},
					{
						name: `Twitter`,
						url: `https://twitter.com/_albizures`,
					},
					{
						name: `Instagram`,
						url: `https://www.instagram.com/_albizures`,
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-113899183-1',
			},
		},
		`gatsby-plugin-sitemap`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Jose Albizures - Web developer`,
				short_name: `Jose Albizures`,
				description: `Jose Albizures - Web developer`,
				start_url: `/`,
				background_color: `#fff`,
				theme_color: `#6B46C1`,
				display: `standalone`,
				icons: [
					{
						src: `/android-chrome-192x192.png`,
						sizes: `192x192`,
						type: `image/png`,
					},
					{
						src: `/android-chrome-512x512.png`,
						sizes: `512x512`,
						type: `image/png`,
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-i18n',
			options: {
				langKeyDefault: 'en',
				useLangKeyLayout: false,
			},
		},
		`gatsby-plugin-offline`,
		// `gatsby-plugin-webpack-bundle-analyser-v2`,
	],
};
