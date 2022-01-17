<script>
	import '../tailwind.css';
	import Nav from '../components/Nav.svelte';
	export let global;
	export let sections;
	export let origin = '';



</script>
<script context="module">
	export async function load({ fetch,url }) {
			const res = await fetch('/global.json');
			const {global,sections} = await res.json();
			return {
				props: {global,sections,origin: url.origin}
			};
	}
</script>

<div class="flex flex-col justify-center px-8 bg-base-100 ">
	<Nav sections={sections}/>
</div>
<main class="flex flex-col justify-center px-8 bg-base-100 ">
	<slot />

	<footer class="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
		<div class="w-full h-1 border-1 bg-gradient-to-r from-primary via-primary-focus to-accent mb-8" />
		<!-- <div class="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3"> -->
		<div class="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2">
			<div class="flex flex-col space-y-4">
				<a class="" href="/">Home</a><a
					class=" "
					href="/about">About</a
				>
				<a class="" href="/#newsletter">Newsletter</a>
				<a class="" href={origin + "/api/rss.xml"} rel="external">RSS</a>
			</div>
			<div class="flex flex-col space-y-4">
				<a
					class=""
					target="_blank"
					rel="noopener noreferrer"
					href="https://twitter.com/swyx">Twitter</a
				><a
					class=""
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/sw-yx/swyxkit">GitHub</a
				><a
					class=""
					target="_blank"
					rel="noopener noreferrer"
					href="https://youtube.com/swyxTV">YouTube</a
				>
			</div>
			<!-- <div class="flex flex-col space-y-4">
			<a class="text-gray-500 hover:text-gray-600 transition" href="/uses">Uses</a><a
				class="text-gray-500 hover:text-gray-600 transition"
				href="/guestbook">Guestbook</a
			><a class="text-gray-500 hover:text-gray-600 transition" href="/snippets">Snippets</a><a
				class="text-gray-500 hover:text-gray-600 transition"
				href="/tweets">Tweets</a
			>
		</div> -->
		</div>
	</footer>
</main>
