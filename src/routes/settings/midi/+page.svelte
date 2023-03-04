<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

    import { liveQuery, type Observable } from "dexie";

    import { base } from '$app/paths';
    import { db } from "$stores";
    import type { Note } from '$stores/models/midiModel';
    import { browser } from '$app/environment';

    let notes: Observable<Note[]>;
    notes = liveQuery(
        () => browser ? db.notes.toArray() : []
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
            <Cell>Label</Cell>
            <Cell>Abc (note)</Cell>
            <Cell>Midi</Cell>
            <Cell>Part</Cell>
            <Cell>&nbsp;</Cell>
          </Row>
        </Head>
        <Body>
            {#if $notes}
                {#each $notes as note (note.sound)}
                    <Row>
                        <Cell><a href="{base}/settings/midi/{note.sound}">{note.sound}</a></Cell>
                        <Cell><a href="{base}/settings/midi/{note.sound}">{note.label}</a></Cell>
                        <Cell><a href="{base}/settings/midi/{note.sound}">{note.abc}</a></Cell>
                        <Cell><a href="{base}/settings/midi/{note.sound}">{note.midi.join(', ')}</a></Cell>
                        <Cell><a href="{base}/settings/midi/{note.sound}">{note.part}</a></Cell>
                        <Cell><a href="{base}/settings/midi/{note.sound}">{note.enabled}</a></Cell>
                    </Row>
                {/each}
            {/if}
        </Body>
      </DataTable>
</div>
