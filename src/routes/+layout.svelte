<script lang="ts">
  import '../app.css';
  import NavBar from '$lib/layout/NavBar.svelte';
  import Footer from '$lib/layout/footer.svelte';
  let { children } = $props();
</script>

<div class="relative">
  <div class="absolute inset-0 -z-10 hidden opacity-30 lg:block">
    <img src="/bg_desktop.svg" class="h-full w-full object-cover" alt="desktop background" />
  </div>

  <div class="absolute inset-0 -z-10 block opacity-30 lg:hidden">
    <img src="/bg_mobile.svg" class="h-full w-full object-cover" alt="mobile background" />
  </div>

  <main
    class="flex h-screen w-full flex-col px-2 py-4 sm:mx-auto sm:max-w-160 md:max-w-180 lg:max-w-220 xl:max-w-300"
  >
    <NavBar />
    <div class="grow px-4">
      {@render children()}
    </div>
    <Footer />
  </main>
</div>
