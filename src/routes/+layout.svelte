<script lang="ts">
  import '../app.css';
  import NavBar from '$lib/layout/NavBar.svelte';
  import Footer from '$lib/layout/footer.svelte';
  let { children } = $props();
</script>

<div class="mx-auto flex h-screen w-full flex-col p-4 sm:max-w-160 md:max-w-180 lg:max-w-220 xl:max-w-300">
  <NavBar />
  <div class="grow">
    {@render children()}
  </div>
  <Footer />
</div>
