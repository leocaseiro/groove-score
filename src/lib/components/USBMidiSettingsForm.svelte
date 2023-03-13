<script lang="ts">
    import Kitchen from '@smui/snackbar/kitchen';
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
    import Radio from '@smui/radio';

    import { midiUsb } from '$stores';
    import { loadWebmidi } from '$actions/webmidi';

    let success: Kitchen;

    let options = ['Apple', 'Orange', 'Banana', 'Mango'];

    let selected = 'Orange';

    // export let usb: USB;

    // $: toggle = (item) => {
    //     // db.usb.update();
    //     console.log('item', item);
    // }
</script>

<Kitchen bind:this={success} dismiss$class="material-icons" />
<div use:loadWebmidi>
    <FormField align="end">
        <svelte:fragment slot="label">USB MIDI</svelte:fragment>
        <Switch bind:checked={$midiUsb} />
    </FormField>
    <br />
    {#each options as option}
        <FormField class="gs-smui-mdc-form-field">
            <Radio disabled={!$midiUsb} bind:group={selected} value={option} />
            <span slot="label">
                {option}
            </span>
        </FormField>
    {/each}
</div>

<style>
    :global(.gs-smui-mdc-form-field) {
        width: 100%;
    }
</style>
