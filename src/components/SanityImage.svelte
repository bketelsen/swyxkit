<script>
  import {urlFor} from '$lib/sanityClient'

  export let image
  export let maxWidth = 1200
  export let alt = undefined
  export let classes
  console.log(image)
</script>

{#if image}
  <img
    src={urlFor(image).width(maxWidth).fit('fillmax').auto('format')}
    alt={alt || image.alt || ''}
    class={classes}
  />
{/if}
