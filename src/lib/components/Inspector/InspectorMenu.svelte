<script lang="ts">
  import { Button, Select, Label } from 'flowbite-svelte';
  import { allNoteNames, Note } from '$lib/core/note';
  import { allScales } from '$lib/core/scaleDefinition';
  import { selectedRoot, selectedScale } from '$lib/components/Inspector/store.svelte';

  let { theClass = '' } = $props();

  const rootOptions = allNoteNames.map((note) => ({
    value: note,
    name: note,
  }));
  const scaleOptions = allScales.map((scale) => ({
    value: scale.name,
    name: scale.name,
  }));

  const rootNote = $derived.by(() => {
    return new Note(selectedRoot.current, 0);
  });

  function toggleEnhamonic() {
    selectedRoot.current = rootNote.enharmonicEquivalent().name;
  }
</script>

<div class={`flex justify-between ${theClass}`}>
  <div>
    <p class="text-black dark:text-white">Select key:</p>
    <div class="flex">
      <Select
        class="w-20"
        selectClass="rounded-r-none"
        items={rootOptions}
        bind:value={selectedRoot.current}
      />
      <Button class="rounded-l-none focus:ring-0" onclick={toggleEnhamonic}>♯/♭</Button>
    </div>
  </div>
  <div>
    <p class="text-black dark:text-white">Select scale:</p>
    <Select selectClass="min-w-40" items={scaleOptions} bind:value={selectedScale.current} />
  </div>
</div>
