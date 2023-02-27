<script lang="ts">
    import { liveQuery, type Observable } from "dexie";

    import { midiDB } from "$stores";
    import type { INote } from '$stores/midi/midiModel';
    import { browser } from '$app/environment';

	import type { PageData } from './$types';

    import MapMidiSettingsForm from './MapMidiSettingsForm.svelte';

    export let data: PageData;

    let note: Observable<INote | null>;
    note = liveQuery(
        () => browser ? midiDB.notes.get(data.sound) : null
    );
</script>

<svelte:head>
	<title>Map Midi | Settings | Groove Score</title>
	<meta name="description" content="Setup midi for Groove Score" />
</svelte:head>

<div class="text-column">
	<h1>Edit {data.sound}</h1>

    {#if $note}
        <MapMidiSettingsForm note={$note} />
    {/if}
</div>
