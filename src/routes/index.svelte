<script context="module">
	import { SITE_URL, REPO_URL } from '$lib/siteConfig';
	export const prerender = true; // index page is most visited, lets prerender
		export async function load({ fetch }) {
		try {
			const res = await fetch('/index.json');
			const data = await res.json();
			return {
				props: data
			};
		} catch (err) {
			console.log('500:', err);
		}
	}
</script>

<script>
	import Newsletter from '../components/Newsletter.svelte';
	import FeatureCard from '../components/FeatureCard.svelte';
	import SectionCard from '../components/SectionCard.svelte';
	export let sections;
	export let page = {};
	// meta tags
	let Title = page && page.seo.metaTitle || "Brian Ketelsen";
	let Description = page && page.seo.metaDescription || "Home on the Range";
	let ogImage =
		'https://user-images.githubusercontent.com/6764957/147861359-3ad9438f-41d1-47c8-aa05-95c7d18497f0.png';
</script>

<svelte:head>
	<title>{Title}</title>
	<link rel="canonical" href={SITE_URL} />
	<link rel="alternate" type="application/rss+xml" href={SITE_URL + '/api/rss.xml'} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={Title} />
	<meta name="Description" content={Description} />
	<meta property="og:description" content={Description} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="https://twitter.com/bketelsen/" />
	<meta name="twitter:title" content={Title} />
	<meta name="twitter:description" content={Description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div
	class="flex flex-col justify-center items-start max-w-2xl  mx-auto pb-16"
>
	<div class="flex flex-col-reverse sm:flex-row items-start">
		<div class="flex flex-col pr-8">
			<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-5 text-base-content">
				<span
					class="ml-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-accent relative inline-block"
				>
					<span class="relative text-primary skew-y-3">{page.title}</span>
				</span>

			</h1>
			<h2 class="text-xl text-base-content mb-16">
			{page.herotext}
			</h2>

		</div>
		<!-- <div
				class="w-[80px] h-[80px] rounded-full sm:w-[176px] sm:h-[136px] relative mb-8 sm:mb-0 mr-auto bg-cyan-300 bg-opacity-25"
			/> -->
	</div>
	<section class="mb-16 w-full">
		<h3 class="font-bold text-2xl md:text-4xl tracking-tight mb-6 ">
			The Goods
		</h3>
		<div class="flex gap-6 flex-col md:flex-row">
			{#each sections as section}
			<SectionCard title={section.title} href={section.slug.current} description={section.description} />
			{/each}

		</div>

	</section>
	<section class="mb-16 w-full">
		<h3 class="font-bold text-2xl md:text-4xl tracking-tight mb-6 ">
			Featured Posts
		</h3>
		<div class="flex gap-6 flex-col md:flex-row">
			<FeatureCard title="Welcome to swyxkit 2022!" href="/welcome" date={'Jan 2022'} />
			<FeatureCard
				title="Moving to a GitHub CMS"
				href="/moving-to-a-github-cms"
				date={'Jan 2022'}
			/>
			<FeatureCard title="HTML Ipsum demo" href="/moo" date={'Jan 2022'} />
		</div>
		<a
			class="flex mt-8 0 leading-7 rounded-lg
				 hover:text-primary transition-all h-6"
			href="/blog"
			>See latest posts<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="h-6 w-6 ml-1"
				><path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
				/></svg
			></a
		>
	</section>
	<Newsletter />
</div>
