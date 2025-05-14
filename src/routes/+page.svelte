<script>
  import { Select } from 'flowbite-svelte';
  import { allNoteNames } from '$lib/core/note';
  import { allScales } from '$lib/core/scaleDefinition';

  const rootOptions = allNoteNames.map((note) => ({
    value: note,
    name: note,
  }));
  let selectedRoot = $state(rootOptions[0].value);
  const scaleOptions = allScales.map((scale) => ({
    value: scale.name,
    // name: scale.alternateName ? `${scale.name} (${scale.alternateName})` : scale.name,
    name: scale.name,
  }));
  let selectedScale = $state(scaleOptions[0].value);
</script>

<div class="p-8">
  <div class="flex justify-between">
    <div>
      <p class="text-black dark:text-white">Select key:</p>
      <Select items={rootOptions} bind:value={selectedRoot} />
    </div>
    <div>
      <p class="text-black dark:text-white">Select scale:</p>
      <Select items={scaleOptions} bind:value={selectedScale} />
    </div>
  </div>
  <h1>The selected scale is {selectedRoot} {selectedScale}</h1>
</div>
