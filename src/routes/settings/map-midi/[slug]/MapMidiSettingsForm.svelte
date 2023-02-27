<script lang="ts">
    import { createForm } from 'svelte-forms-lib';
    import { array, number, object } from 'yup';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import Button from '@smui/button';

    import type { INote } from '$stores/midi/midiModel';

    export let note: INote;

    const { form, errors, handleSubmit } = createForm({
        initialValues: {
            midi: note?.midi ?? [],
        },
        validationSchema: object().shape({
            midi: array().min(1).of(number().required()),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        }
    });
</script>

<form on:submit={handleSubmit}>
    {#each note?.midi as midi, i}
    <Textfield name="midi" label="Midi" bind:value={$form.midi[i]}>
        <svelte:fragment slot="helper">
            <HelperText persistent>{$errors.midi && $errors.midi}</HelperText>
        </svelte:fragment>
    </Textfield>
    {/each}

    <pre>{JSON.stringify($errors, null, 2)}</pre>

    <Button type="submit">submit</Button>
</form>
