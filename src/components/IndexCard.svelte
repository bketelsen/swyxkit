<script>
	// href={item.slug} title={item.data.title} date={item.data.date}
	export let href = '#'
	export let ghMetadata = null
	export let title = 'Untitled post'
	export let date = 'no date'
</script>

<a sveltekit:prefetch  class="w-full " {href}
	><div class="w-full mb-8">
		<div class="flex flex-col justify-between md:flex-row">
			<h4 class="w-full mb-2 text-lg font-medium md:text-xl flex-auto">
				{title}
			</h4>
			<div class="inline-flex flex-1 items-center">
				{#if ghMetadata && ghMetadata.reactions.total_count}
					<span class=" min-w-[2rem] mr-2 text-xs font-mono text-opacity-70 ">{ghMetadata.reactions.total_count} ♥</span>
				{/if}
				<p class="w-32 mb-4 text-left  md:text-right md:mb-0">{date}</p>
			</div>
		</div>
		<p class="">
			<slot />
		</p>
	</div></a
>
