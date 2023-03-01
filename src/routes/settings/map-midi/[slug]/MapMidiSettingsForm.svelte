<script lang="ts">
    import { createForm } from 'svelte-forms-lib';
    import { array, number, object } from 'yup';
    import Button from '@smui/button';
    import IconButton from '@smui/icon-button';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import Kitchen from '@smui/snackbar/kitchen';

    import { midiDB } from '$stores';
    import type { INote } from '$stores/midi/midiModel';
    import { mapArrToObjValues, mapObjValuesToArr } from '$lib/utils';

    let success: Kitchen;

    export let note: INote;

    const { form, errors, handleSubmit } = createForm({
        initialValues: {
            midi: mapArrToObjValues<number>(note?.midi) ?? [{}],
        },
        validationSchema: object().shape({
            midi: array().min(1).of(object({ val: number().typeError('midi must be a number') })),
        }),
        onSubmit: (values) => {
            const newMidi = mapObjValuesToArr<number>(values.midi).map(n => Number(n));
            midiDB.notes.update(note.sound, { midi: newMidi});

            // Hack to fix bug with $errors not updating
            // @ts-expect-error Type 'string' is not assignable to type 'number'.ts(2769)
            $errors.midi = newMidi.map(() => ({ val: '' }));

            success.push({
                props: {
                    variant: 'stacked',
                },
                label: `The MIDI for ${note.sound} was updated with ${newMidi.join(', ')}`,
                dismissButton: true,
            });
        }
    });

    $: addMidi = () => {
        // @ts-expect-error Type 'string' is not assignable to type 'number'.ts(2769)
        $form.midi = $form.midi.concat({ val: '' });
        // @ts-expect-error Type 'string' is not assignable to type 'number'.ts(2769)
        $errors.midi = $errors.midi.concat({ val:  '' });
    }

    $: removeMidi = (index: number) => {
        // @ts-expect-error Property 'filter' does not exist on type 'string'.ts(2339)
        $errors.midi = $errors.midi.filter((item: { val: number }, i: number) => i !== index);
        $form.midi = $form.midi.filter((_, i: number) => i !== index);
    }

    $: cast = (midi: any): { val: number } => midi;
</script>

<Kitchen bind:this={success} dismiss$class="material-icons" />

<form on:submit={handleSubmit}>
    {#each $form.midi as midi, i}
    <IconButton on:click={(e) => { e.preventDefault(); removeMidi(i)}} class="material-icons" aria-label="Remove midi">remove</IconButton>
    <Textfield name={`midi[${i}].val`} label="Midi" bind:value={$form.midi[i].val}>
        <svelte:fragment slot="helper">
            <HelperText persistent validationMsg>{$errors?.midi[i] && cast($errors.midi[i])?.val}</HelperText>
        </svelte:fragment>
    </Textfield>
    {/each}
    <IconButton on:click={(e) => { e.preventDefault(); addMidi()}} class="material-icons" aria-label="Add midi">add</IconButton>
    <br />
    <Button type="submit">submit</Button>
</form>
