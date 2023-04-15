import { liveQuery } from 'dexie';

import { MIDI_INPUT } from '$stores/models/settingsModel';
import { db, midiInputs } from '$stores';
import { browser } from '$app/environment';

export type NoteEvent = {
    note: number;
    timestamp: number;
    velocity: number;
};

let midiAccess: MIDIAccess;
let selectedInput: MIDIInput | null = null;
let noteEvents: NoteEvent[] = [];
let inputOptions: { id: string; name: string }[] = [];

const handleMidiMessage = (event: MIDIMessageEvent) => {
    console.log('handleMidiMessage', event.data);
    const command = event.data[0];
    const timestamp = event.timeStamp;
    // note on
    if (command <= 144 && command <= 159) {
        const note = event.data[1];
        const velocity = event.data.length > 2 ? event.data[2] : 0;
        noteEvents = [{ note, timestamp, velocity }, ...noteEvents];
    }
};

export const midi_input = liveQuery(async () => {
    if (!browser) {
        return;
    }
    const input = await db.settings.get(MIDI_INPUT);
    if (!input) {
        return { enabled: false };
    }
    return input?.value || { enabled: false };
});

export const getInputName = (input: MIDIInput) => {
    let inputName = input.name ? input.name : input.manufacturer;
    inputName = inputName ?? 'Midi Input'; // Make sure there is always a name
    return inputName;
};

export const updateSelectedInput = (id: string, by: 'auto' | 'manual' = 'auto') => {
    const input = midiAccess?.inputs.get(id);
    if (!input) {
        return;
    }

    if (selectedInput) {
        // @ts-expect-error MIDIMessageEvent is different from Event
        selectedInput.removeEventListener('midimessage', handleMidiMessage);
    }

    selectedInput = input;
    // @ts-expect-error MIDIMessageEvent is different from Event
    selectedInput.addEventListener('midimessage', handleMidiMessage);

    db.settings.update(MIDI_INPUT, {
        value: { enabled: true, id: input.id, name: getInputName(input), by }
    });
};

export const disableMidiInput = () => {
    if (selectedInput) {
        // @ts-expect-error MIDIMessageEvent is different from Event
        selectedInput.removeEventListener('midimessage', handleMidiMessage);
    }

    db.settings.update(MIDI_INPUT, { 'value.enabled': false });
    db.settings.update(MIDI_INPUT, { 'value.by': 'auto' });
};

export async function loadMidi(_node) {
    if (!navigator.requestMIDIAccess) {
        const warning = 'WebMidi API not supported on this browser.';
        alert(warning);
        console.warn(warning);
        return;
    }

    try {
        midiAccess = await navigator.requestMIDIAccess();
        midiAccess.onstatechange = () => {
            const inputs: MIDIInput[] = [];

            // Using forEach because of an issue with `Array.from` on iOS https://github.com/mizuhiki/WebMIDIAPIShimForiOS/issues/11
            midiAccess?.inputs.forEach((input) => {
                inputs.push(input);
            });

            if (inputs.length > 0) {
                inputOptions = inputs.map((input, i) => {
                    return { id: input.id, name: `${i + 1}: ${getInputName(input)}` };
                });

                if (!selectedInput || !inputs.includes(selectedInput)) {
                    updateSelectedInput(inputs[0].id);
                }
                midiInputs.set(inputOptions);
            } else {
                midiInputs.set([]);
                selectedInput = null;
                disableMidiInput();
            }
        };

        // @ts-expect-error event is not been used
        midiAccess.onstatechange();
    } catch (error) {
        console.error('Failed to initialize MIDI: ', error);
    }

    return {
        destroy() {
            disableMidiInput();
        }
    };
}
