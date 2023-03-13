<script lang="ts">
    import Kitchen from '@smui/snackbar/kitchen';
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
    import Radio from '@smui/radio';

    import { loadMidi } from '$actions/webmidi';

    import { liveQuery, type Observable } from "dexie";

    import { browser } from '$app/environment';
    import { db } from '$stores';
    import { MIDI_INPUT } from '$stores/models/settingsModel';
    import type { MidiInput } from '$stores/models/midiInputModel';

    let success: Kitchen;

    const midi_input = liveQuery(
      async () => {
        if (!browser) {
            return;
        }

        const input = await db.settings.get(MIDI_INPUT);

        if (!input) {
            return { enabled: false };
        }
        
        return input?.value || { enabled: false };
  	});

    let inputs: Observable<MidiInput[]>;
    inputs = liveQuery(
        async () => browser ? await db.inputMidi.toArray() : []
    );

    // export let usb: USB;

    // $: selected = $midi_input.name || '';

    // $: toggle = (item) => {
    //     // db.usb.update();
    //     console.log('item', item);
    // }
</script>

<Kitchen bind:this={success} dismiss$class="material-icons" />
<div use:loadMidi>
    {#if $midi_input}
        <FormField align="end">
            <svelte:fragment slot="label">USB MIDI</svelte:fragment>
            <Switch bind:checked={$midi_input.enabled} />
        </FormField>
        {#if $inputs}
        {#each $inputs as option}
            <FormField class="gs-smui-mdc-form-field">
                <Radio disabled={!$midi_input.enabled} bind:group={$midi_input.name} value={option.name} />
                <span slot="label">
                    {option.name}
                </span>
            </FormField>
        {/each}
        {/if}

    {/if}
</div>

<style>
    :global(.gs-smui-mdc-form-field) {
        width: 100%;
    }
</style>
