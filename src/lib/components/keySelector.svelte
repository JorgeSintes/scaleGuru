<script lang="ts">
  import { Button, Select, Label } from 'flowbite-svelte';
  import { allNotes, Note } from '$lib/core/note';

  let {
    selectedRoot = $bindable(),
    labelText = 'Select key:',
    class: containerClass = 'w-full sm:w-60 lg:w-80',
    labelClass = 'text-lg text-black ',
    selectClass = 'rounded-r-none grow',
  } = $props();

  const rootOptions = allNotes
    .keys()
    .toArray()
    .map((note) => ({
      value: note,
      name: note,
    }));
  const rootNote = $derived.by(() => {
    return new Note(selectedRoot.current, 0);
  });

  function toggleEnhamonic() {
    selectedRoot.current = rootNote.enharmonicEquivalent().name;
  }
</script>

<div class={containerClass}>
  <Label class={labelClass}>{labelText}</Label>
  <div class="flex">
    <Select {selectClass} class="grow" items={rootOptions} bind:value={selectedRoot.current} />
    <Button class="min-w-15 rounded-l-none text-black focus:ring-0" onclick={toggleEnhamonic}>♯/♭</Button>
  </div>
</div>
