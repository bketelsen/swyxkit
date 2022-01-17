<script>
  export let portableText
</script>

<a
class="ml-2 before:block before:absolute hover:before:inset-1 hover:before:-skew-y-2 before:bg-primary relative inline-block"
 href={portableText.mark.href} target="_blank">
 <span class="relative skew-y-3">
  <slot />
  </span>
</a>
