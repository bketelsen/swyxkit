<script>
	import { page } from '$app/stores';
	$: isActive = $page.url.pathname === $$props.href;
	export let href;
</script>

<a
class="ml-2 hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg before:block before:absolute hover:before:inset-1 hover:before:-skew-y-2 before:bg-primary relative inline-block"
	class:font-semibold={isActive}
	{href}
	> <span class="relative skew-y-3 capsize">
 <slot /> </span>
</a>
