<script lang="ts">
    import type { PageData } from './$types';
    import MapMidiSettingsForm from './MapMidiSettingsForm.svelte';

    export let data: PageData;
    $: note = data.note;
</script>

<h1>Edit {$note?.sound ?? 'note'}</h1>

{#if $note}
    <MapMidiSettingsForm note={$note} />
{/if}
