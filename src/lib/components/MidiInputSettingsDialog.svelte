<script lang="ts">
    import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
    import Button, { Label } from '@smui/button';

    import MidiInputSettingsForm from './MidiInputSettingsForm.svelte';

    export let open: boolean = false;

    function closeHandler(e: CustomEvent<{ action: string }>) {
        open = false;
    }
</script>

<Dialog
    bind:open
    on:SMUIDialog:closed={closeHandler}
>
    <Title id="list-selection-title">MIDI Input</Title>
    <Content id="list-selection-content">
        <MidiInputSettingsForm />
    </Content>
    <Actions>
        <Button>
            <Label>Close</Label>
        </Button>
    </Actions>
</Dialog>
