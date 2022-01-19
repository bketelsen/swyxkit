<script context="module">
	// export const prerender = true; // turned off so it refreshes quickly
	export async function load({ params, fetch }) {
		const res = await fetch(`/api/blog.json`);
		// alternate strategy https://www.davidwparker.com/posts/how-to-make-an-rss-feed-in-sveltekit
		// Object.entries(import.meta.glob('./*.md')).map(async ([path, page]) => {
		if (res.status > 400) {
			return {
				status: res.status,
				error: await res.text()
			};
		}
		const { page, posts } = await res.json();
		return {
			props: { page, posts },
			maxage: 60 // 1 minute
		};
	}
</script>

<script>
	import IndexCard from '../components/IndexCard.svelte';

	export let page;
	export let posts;

	console.log(page);
</script>

<svelte:head>
	<title>{page.seo.metaTitle}</title>
	<meta name="description" content={page.seo.metaDescription} />
</svelte:head>

<section class="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16 px-4 sm:px-8">
	<h1 class="mb-4 text-3xl font-bold tracking-tight md:text-5xl ">
		{page.title}
	</h1>
	<p class="mb-4 ">
		{page.herotext}
	</p>

	<h3 class="mt-8 mb-4 text-2xl font-bold tracking-tight  md:text-4xl ">Most Popular</h3>
	<IndexCard href="/foo" title="Hardcoded Blogpost # 1" date="106,255 views">
		Just a hardcorded blogpost or you can use the metadata up to you
	</IndexCard>
	<IndexCard href="/welcome" title="Welcome to Swyxkit" date="106,255 views">
		Just a hardcorded blogpost or you can use the metadata up to you
	</IndexCard>
	<IndexCard href="/moo" title="Hardcoded Blogpost # 3" date="106,255 views">
		Just a hardcorded blogpost or you can use the metadata up to you
	</IndexCard>

	<h3 class="mt-8 mb-4 text-2xl font-bold tracking-tight  md:text-4xl ">All Posts</h3>

	{#if posts.length}
		<ul class="">
			{#each posts as item}
				<li class="mb-8 text-lg">
					<!-- <code class="mr-4">{item.data.date}</code> -->
					<IndexCard
						href={item.slug}
						title={item.title}
						date={new Date(item.date).toISOString().slice(0, 10)}
						ghMetadata={item.ghMetadata}
					>
						{item.excerpt || ''}
					</IndexCard>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="prose dark:prose-invert">No blogposts found!</div>
	{/if}
</section>
