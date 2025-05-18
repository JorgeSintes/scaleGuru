<script lang="ts">
  import { Select, Label } from 'flowbite-svelte';
  import { allScales } from '$lib/core/scaleDefinition';

  let {
    selectedScale = $bindable(),
    labelText = 'Select scale:',
    class: containerClass = 'w-full sm:w-60 lg:w-80',
    labelClass = 'text-lg text-black ',
    selectClass = '',
  } = $props();

  const scaleOptions = allScales.map((scale) => ({
    value: scale.name,
    name: scale.name,
  }));
</script>

<div class={containerClass}>
  <Label class={labelClass}>{labelText}</Label>
  <Select {selectClass} items={scaleOptions} bind:value={selectedScale.current} />
</div>
