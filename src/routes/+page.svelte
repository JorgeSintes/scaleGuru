<script>
  import { PersistentState } from '@friendofsvelte/state';

  import ScaleView from '$lib/components/scaleView.svelte';
  import KeySelector from '$lib/components/keySelector.svelte';
  import ScaleSelector from '$lib/components/scaleSelector.svelte';

  let selectedRoot = new PersistentState('selectedRoot', 'C', 'localStorage');
  let selectedScale = new PersistentState('selectedScale', 'Major', 'localStorage');
</script>

<h1 class="mb-6 text-2xl sm:text-4xl">Scale Inspector</h1>
<div class={`flex flex-col gap-8 sm:flex-row sm:justify-between`}>
  <KeySelector bind:selectedRoot />
  <ScaleSelector bind:selectedScale />
</div>
<ScaleView root={selectedRoot} scale={selectedScale} />
