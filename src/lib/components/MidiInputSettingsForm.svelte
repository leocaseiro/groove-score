<script lang="ts">
    import Kitchen from '@smui/snackbar/kitchen';
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
    import Radio from '@smui/radio';
    import { disableMidiInput, loadMidi, midi_input, updateSelectedInput } from '$actions/webmidi';

    import { db, midiInputs } from '$stores';
    import { MIDI_INPUT } from '$stores/models/settingsModel';

    let success: Kitchen;
    let selected = '';
    let is_enabled = false;

    $: midi_input.subscribe(({ id, enabled }) => {
        selected = id;
        is_enabled = enabled;
    });

    $: onToggle = async (e: CustomEvent<{ selected: string }>) => {
        await db.settings.update(MIDI_INPUT, { 'value.enabled': e.detail.selected });
        if (e.detail.selected) {
            updateSelectedInput(selected, 'auto');
        } else {
            disableMidiInput();
        }
    };

    $: onSelect = async (e: CustomEvent) => {
        const id = (e.target as HTMLInputElement).value;
        updateSelectedInput(id, 'manual');
    };
</script>

<Kitchen bind:this={success} dismiss$class="material-icons" />
<div use:loadMidi>
    {#if $midi_input}
        <FormField align="end">
            <svelte:fragment slot="label"
                >{$midiInputs.length > 0
                    ? 'Enable MIDI'
                    : 'No MIDI devices detected'}</svelte:fragment
            >
            <Switch
                on:SMUISwitch:change={onToggle}
                disabled={$midiInputs.length === 0}
                bind:checked={is_enabled}
            />
        </FormField>

        {#if $midiInputs}
            {#each $midiInputs as option}
                <FormField class="gs-smui-mdc-form-field">
                    <Radio
                        on:click={onSelect}
                        disabled={!$midi_input.enabled}
                        bind:group={selected}
                        value={option.id}
                    />
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
