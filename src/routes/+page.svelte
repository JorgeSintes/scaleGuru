<script>
  import { selectedRoot, selectedScale } from '$lib/components/Inspector/store.svelte';
  import InspectorMenu from '$lib/components/Inspector/InspectorMenu.svelte';
</script>

<div class="flex flex-col gap-4 pb-8 md:flex-row md:items-end md:justify-between">
  <h1 class="align-text-bottom text-4xl">Inspector</h1>
  <InspectorMenu theClass="gap-8" />
</div>
<p>The selected scale is {selectedRoot.current} {selectedScale.current}</p>
