import { get } from 'svelte/store';
import { WebMidi, type PortEvent, Input } from 'webmidi';
import { MIDI_INPUT } from '$stores/models/settingsModel';
import { db, midiInputs } from '$stores';

const listenToNote = (input: Input) => {
    input.addListener("noteon", (e) => {
        console.log("noteon.e", e);
        console.log("noteon", e?.data?.join(":"));
    });
}

export async function onMidiConnected(e: PortEvent) {
    if (WebMidi.inputs.length === 0) {
        return
    }

    const [latestInput] = WebMidi.inputs.slice(-1);

    const inputs = get(midiInputs);

    const {
        id,
        manufacturer,
        name
    } = latestInput;

    midiInputs.set([...inputs, {
        id,
        manufacturer,
        name: name || manufacturer || 'MidiInput'
    }]);

    const midiInputSettings = await db.settings.get(MIDI_INPUT);

    if (midiInputSettings?.value.enabled) {
        return;
    }

    if (!midiInputSettings?.value.enabled && midiInputSettings?.value.name === name) {
        db.settings.update(MIDI_INPUT, { value: { enabled: true, name, by: 'auto' } });
        listenToNote(latestInput);
        return;
    }

    if (!midiInputSettings?.value.enabled && !midiInputSettings?.value.name) {
        db.settings.update(MIDI_INPUT, { value: { enabled: true, name, by: 'auto' } });
        listenToNote(latestInput);
        return;
    }

    if (midiInputSettings?.value.enabled && midiInputSettings?.value.name !== name) {
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
    if (WebMidi.inputs.length === 0) {
        db.settings.update(MIDI_INPUT, { 'value.enabled': false });
        db.settings.update(MIDI_INPUT, { 'value.by': 'auto' });
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

// * @fires WebMidi#connected
// * @fires WebMidi#disabled
// * @fires WebMidi#disconnected
// * @fires WebMidi#enabled
// * @fires WebMidi#error
// * @fires WebMidi#midiaccessgranted
// * @fires WebMidi#portschanged

export async function loadMidi(_node) {
    try {
        // WebMidi.addListener('enabled', (e) => {alert('enabled')});
        // WebMidi.addListener('portschanged', (e) => {alert('portschanged')});
        WebMidi.addListener('connected', onMidiConnected);
        WebMidi.addListener('disconnected', onMidiDisconnected);


        await WebMidi.enable();
        // console.log('enable');
    } catch (error) {
        alert('WebMidi could not be enabled.');
        return console.error('WebMidi could not be enabled.', error);
    }
}
