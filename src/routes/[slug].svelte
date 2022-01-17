<script context="module">
	// export const prerender = true; // you can uncomment to prerender as an optimization
	export const hydrate = true;
	import { REPO_URL, SITE_URL } from '$lib/siteConfig';
	export async function load({ url, params, fetch }) {
		const slug = params.slug;
		try {
			const res = await fetch(`/api/blog/${slug}.json`);
			if (res.status > 400) {
				return {
					status: res.status,
					error: await res.text()
				};
			}
			const data = await res.json();
			if (data?.post) {
				return {
					props: data
				};
			}
		} catch (err) {
			console.error('error fetching blog post at [slug].svelte: ' + slug, err);
			return {
				status: 500,
				error: new Error('error fetching blog post at [slug].svelte: ' + slug)
			};
		}
	}
</script>

<script>
	import 'prism-themes/themes/prism-shades-of-purple.min.css';
	import Newsletter from '../components/Newsletter.svelte';
	import PortableText from '@portabletext/svelte';
	import Code from '../components/Code.svelte';
	import Link from '../components/Link.svelte';
	import ImageBlock from '../components/ImageBlock.svelte';
	import AuthorBlock from '../components/AuthorBlock.svelte';
	export let post;

	let title = post.title;
	let date = post.publishedAt;

	// export let slug;
	// export let REPO_URL
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="swyxkit blog" />

	<link rel="canonical" href={SITE_URL} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="Description" content={post.excerpt} />
	<meta property="og:description" content={post.excerpt} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="https://twitter.com/swyx/" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={post.excerpt} />

	<!--	<meta property="og:image" content={post.seo} />
		<meta name="twitter:image" content={json.image} />
	-->
</svelte:head>

<article class="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
	<h1 class="mb-4 text-3xl font-bold tracking-tight  md:text-5xl ">
		{title}
	</h1>
	<div class="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center bg">
		<div class="flex items-center">
			<p class="ml-2 text-sm ">Brian</p>
		</div>
		<p class="mt-2 text-sm min-w-32 md:mt-0">
			{new Date(date).toISOString().slice(0, 10)}
		</p>
	</div>
	<div class="flex h-1 w-full my-2 bg-gradient-to-r from-primary via-primary-focus to-accent" />

	<div class="w-full mt-16 mb-32 prose-xl prose dark:prose-invert max-w-none">
		<PortableText
			blocks={post.body}
			serializers={{
				types: {
					code: Code,
					image: ImageBlock,
					authorReference: AuthorBlock
				},
				marks: {
					link: Link
				}
			}}
		/>
	</div>

	<Newsletter />
</article>
