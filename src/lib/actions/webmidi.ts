import { get } from "svelte/store";
import { MIDI_INPUT } from '$stores/models/settingsModel';
import { db, midiInputs } from '$stores';

/**
 * @link https://github.com/Liinkiing/multipiano/tree/master/src/components/midi
 * @link https://github.com/ryohey/signal/tree/master/src/main/stores/MIDIDeviceStore.ts#L35
 * https://github.com/ricklove/rick-love-master/blob/80025af0fdb0127df169f0713d44a26713172194/_old/code/audio/web-midi-input.ts#L30
 * https://github.com/jpcarrascal/web-midi-poc/blob/main/midi.js
 */

let midiAccess: WebMidi.MIDIAccess;
let selectedInput: MIDIInput | undefined;
let noteOnListener: Listener;
let noteOffListener: Listener;

const listenToNote = (input: MIDIInput) => {
    console.log("listenToNote", input.name || input.manufacturer || 'MidiInput');
    input.addListener("noteon", (e) => {
        console.log("noteon.e", e);
        console.log("noteon", e?.data?.join(":"));
    });
}

export const disableMidiInput = () => {
    // remove any listeners
    db.settings.update(MIDI_INPUT, { 'value.enabled': false });
    db.settings.update(MIDI_INPUT, { 'value.by': 'auto' });
}

export const findInputByName = (inputs: WebMidi.MIDIInput[], name: string) => {
    return inputs.find(input => getInputName(input) === name);
}

export const getInputName = (input: WebMidi.MIDIInput) => {
    const {
        manufacturer,
        name
    } = input;

    return name || manufacturer || 'MidiInput';
}

export const hasInput = (inputs: WebMidi.MIDIInput[]) => {
    return inputs.length > 0;
}

export const updateInputs = (inputsIterator: IterableIterator<WebMidi.MIDIInput>) => {
    const inputs = [];
    for (let o = inputsIterator.next(); !o.done; o = inputsIterator.next()) {
      inputs.push(o.value);
    }
    midiInputs.set([...inputs ?? []]);

    return inputs;
}

export const getLatestInput = () => {
    const inputs = get(midiInputs);

    if (!hasInput(inputs)) {
        return  null;
    }

    const [latestInput] = inputs.slice(-1);

    const latestMidiName = getInputName(latestInput);

    return [latestMidiName, latestInput];
}
/*
export async function onMidiConnected(e: PortEvent) {
    if (WebMidi.inputs.length === 0) {
        return
    }

    const midiInputSettings = await db.settings.get(MIDI_INPUT);

    if (midiInputSettings?.value.enabled) {
        return;
    }
    // listenToNote(latestInput);

    if (!midiInputSettings?.value.enabled && midiInputSettings?.value.name === latestMidiName) {
        db.settings.update(MIDI_INPUT, { value: { enabled: true, name: latestMidiName, by: 'auto' } });
        // listenToNote(latestInput);
        return;
    }

    if (!midiInputSettings?.value.enabled && !midiInputSettings?.value.name) {
        db.settings.update(MIDI_INPUT, { value: { enabled: true, name: latestMidiName, by: 'auto' } });
        // listenToNote(latestInput);
        return;
    }

    if (midiInputSettings?.value.enabled && midiInputSettings?.value.name !== latestMidiName) {
        // TODO
        console.log('show midi input settings/dialog');
        return;
    }

    // midiInputs.set()
    // if (selectedInput === 'all' || selectedInput === e.port.name) {
    //   addInputListener(e.port)
    // }
}

export async function onMidiDisconnected(e: PortEvent) {
    updateInputs(WebMidi.inputs);
    
    if (!hasInput()) {
        disableMidiInput();
        return;
    }

    const [{ name }] = WebMidi.inputs.slice(-1);

    db.settings.update(MIDI_INPUT, { value: { enabled: false, name, by: 'auto' } });

    // TODO remove listener

    // midiInputs.set(WebMidi.inputs.map((input) => input.name));
    // const name = e.port.name;
    // midiListeners[name] = false;
    // if (selectedInput === name) {
    //     selectedInput = 'all';
    //     addAllInputListeners();
    // }
}
*/
export const onInputSelect = (input: MIDIInput) => {
    if (selectedInput) {
        selectedInput.removeListener(noteOnListener);
        selectedInput.removeListener(noteOffListener);
    }

    selectedInput = input;
    if (selectedInput) {
        noteOnListener = selectedInput.addListener("noteon", (e) => {
        console.log('noteon', e);
        });
        noteOffListener = selectedInput.addListener("noteoff", (e) => {
        console.log('noteoff', e);
        });
    }
}

export const onStateChanged = async (event: WebMidi.MIDIConnectionEvent) => {
    console.log(event);
    // update list
    const inputs = updateInputs(midiAccess.inputs.values());

    // update settings
    if (!hasInput(inputs)) {
        disableMidiInput();
        return;
    }

    const midiInputSettings = await db.settings.get(MIDI_INPUT);
    if (midiInputSettings?.value?.enabled) {
        const input = (findInputByName(inputs, midiInputSettings.value.name));
        if (input) {
            return;
        }

        disableMidiInput();
    }

    // check if is still there
    // YES: is 
    // NO
}


export async function loadMidi(_node) {
    if (!window.navigator?.requestMIDIAccess) {
        alert("Web MIDI API is not available on your browser.");
        return;       
    }

    try {
        const midiAccess = await window.navigator.requestMIDIAccess({ sysex: false });
        midiAccess.onstatechange = onStateChanged;
    } catch(err) {
        alert("Web MIDI API is not available on your browser.");
        console.error(err);
    }
}
