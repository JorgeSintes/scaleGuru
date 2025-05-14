<script>
  import { selectedRoot, selectedScale } from '$lib/components/Inspector/store.svelte';
  import { allNotes } from '$lib/core/note';
  import { Scale } from '$lib/core/scale';
  import { allScalesMap } from '$lib/core/scaleDefinition';
  import { onMount } from 'svelte';
  import { VexFlow } from 'vexflow';

  const showScale = $derived.by(() => {
    let theNote = allNotes.get(selectedRoot.current);
    let theScale = allScalesMap.get(selectedScale.current);
    if (theNote === undefined || theScale === undefined) return;
    return new Scale(theNote, theScale);
  });

  function drawScale() {
    const output = document.getElementById('scaleContainer');
    if (!output) return;
    output.innerHTML = '';
    let width = output.clientWidth || 500;
    let height = output.clientHeight || 200;

    const factory = new VexFlow.Factory({
      renderer: {
        elementId: 'scaleContainer',
        width: width,
        height: height,
      },
    });
    // VexFlow.setFonts('Petaluma');
    // VexFlow.setFonts('Musejazz');

    const score = factory.EasyScore();
    const system = factory.System({ width: width });

    let notes = showScale?.toVexflow();
    if (notes === undefined) return;
    system
      .addStave({
        voices: [new VexFlow.Voice().setStrict(false).addTickables(score.notes(notes))],
      })
      .addClef('treble');
    factory.draw();
  }

  $effect(() => {
    drawScale();
  });
</script>

<div class="mt-12 flex justify-center">
  <div
    class="w-full rounded-lg border border-gray-200 bg-white p-6 text-left shadow-md lg:w-9/12 dark:border-gray-700 dark:bg-gray-800"
  >
    <h2 class="mb-8 text-3xl font-semibold text-gray-900 dark:text-white">
      {showScale?.getName()}
    </h2>
    <div id="scaleContainer" class="flex justify-center lg:mx-15"></div>
  </div>
</div>
