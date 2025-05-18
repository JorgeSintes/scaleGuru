<script lang="ts">
  import { Button, Select, Label } from 'flowbite-svelte';
  import { allNotes, Note } from '$lib/core/note';
  import { allScales } from '$lib/core/scaleDefinition';
  import { selectedRoot, selectedScale } from '$lib/components/Inspector/store.svelte';

  let { theClass = '' } = $props();

  const rootOptions = allNotes
    .keys()
    .toArray()
    .map((note) => ({
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

<div class={`flex flex-col sm:flex-row sm:justify-between ${theClass}`}>
  <div class="w-full sm:w-60 lg:w-80">
    <Label class="text-lg text-black dark:text-white">Select key:</Label>
    <div class="flex">
      <Select
        selectClass="rounded-r-none grow"
        class="grow"
        items={rootOptions}
        bind:value={selectedRoot.current}
      />
      <Button class="min-w-15 rounded-l-none text-black focus:ring-0" onclick={toggleEnhamonic}>♯/♭</Button>
    </div>
  </div>
  <div class="w-full sm:w-60 lg:w-80">
    <Label class="text-xl text-black dark:text-white">Select scale:</Label>
    <Select selectClass="" items={scaleOptions} bind:value={selectedScale.current} />
  </div>
</div>
