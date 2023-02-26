<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

    import { liveQuery, type Observable } from "dexie";

    import { midiDB } from "$stores";
    import type { INote } from '$stores/midi/midiModel';
    import { browser } from '$app/environment';

    let notes: Observable<INote[]>;
    notes = liveQuery(
        () => browser ? midiDB.notes.toArray() : []
    );
</script>

<svelte:head>
	<title>Map Midi | Settings | Groove Score</title>
	<meta name="description" content="Setup midi for Groove Score" />
</svelte:head>

<div class="text-column">
	<h1>Settings: Map Midi</h1>

    <DataTable stickyHeader table$aria-label="Map Midi" style="max-width: 100%;">
        <Head>
          <Row>
            <Cell>Sound</Cell>
            <Cell>Abc (note)</Cell>
            <Cell>Midi</Cell>
          </Row>
        </Head>
        <Body>
            {#if $notes}
                {#each $notes as note (note.sound)}
                    <Row>
                        <Cell>{note.sound}</Cell>
                        <Cell>{note.abc}</Cell>
                        <Cell>{note.midi.join(', ')}</Cell>
                    </Row>
                {/each}
            {/if}
        </Body>
      </DataTable>
</div>
