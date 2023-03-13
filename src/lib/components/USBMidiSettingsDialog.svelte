<script lang="ts">
    import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';

    import USBMidiSettingsForm from './USBMidiSettingsForm.svelte';

    export let open: boolean = false;

    function closeHandler(e: CustomEvent<{ action: string }>) {
        console.log('closeHandler', e);
        open = false;
    }
</script>

<Dialog
    bind:open
    on:SMUIDialog:closed={closeHandler}
>
    <Title id="list-selection-title">MIDI Input</Title>
    <Content id="list-selection-content">
        <USBMidiSettingsForm />
    </Content>
    <Actions>
        <Button>
            <Label>Close</Label>
        </Button>
    </Actions>
</Dialog>
