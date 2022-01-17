<script>
	export let title = 'Untitled post';
	export let href = '#';
	export let description = 'No Description';
</script>

<a
	class="transform hover:scale-[1.01] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-primary to-accent"
	{href}
	><div class="flex flex-col justify-between h-full bg-base-100 text-base-content rounded-lg p-4">
		<div class="flex flex-col md:flex-row justify-between">
			<h4
				class="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full tracking-tight"
			>
				{title}
			</h4>

		</div>
		<div class="flex items-center ">
			{description}
		</div>
	</div></a
>
