<script lang="ts">
    import Kitchen from '@smui/snackbar/kitchen';
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
    import Radio from '@smui/radio';
    import { loadMidi } from '$actions/webmidi';
    import { liveQuery, type Observable } from "dexie";
    import { browser } from '$app/environment';
    import { db, midiInputs } from '$stores';
    import { MIDI_INPUT } from '$stores/models/settingsModel';
    import type { MidiInput } from '$stores/models/midiInputModel';
    let success: Kitchen;
    let selected = '';
    let is_enabled = false;
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
    $: midi_input.subscribe(({ id, enabled }) => {
        selected = id;
        is_enabled = enabled
    });
    $: onToggle = async (e: CustomEvent) => {
        await db.settings.update(MIDI_INPUT, { 'value.enabled': e.detail.selected });
        // TODO disableInput
    }
    $: onSelect = async (e: CustomEvent) => {
        await db.settings.update(MIDI_INPUT, { 'value.name': e.target.value });
        // TODO change input
    }
</script>

<Kitchen bind:this={success} dismiss$class="material-icons" />
<div use:loadMidi>
    <!-- {@debug $midiInputs} -->
    <!-- {@debug $midi_input} -->
    {#if $midi_input}
        <FormField align="end">
            <svelte:fragment slot="label">Enable MIDI</svelte:fragment>
            <Switch on:SMUISwitch:change={onToggle} bind:checked={is_enabled} />
        </FormField>
        {#if $midiInputs}
            {#each $midiInputs as option}
                {@debug option}
                <FormField class="gs-smui-mdc-form-field">
                    <Radio on:click={onSelect} disabled={!$midi_input.enabled} bind:group={selected} value={option.id} />
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