<script lang="ts">
  import '../app.css';
  import NavBar from '$lib/layout/NavBar.svelte';
  let { children } = $props();
</script>

<div class="mx-auto w-full p-4 sm:max-w-160 md:max-w-200 lg:max-w-220 xl:max-w-300">
  <NavBar />
  {@render children()}
</div>
