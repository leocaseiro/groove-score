import { WebMidi, type PortEvent, type Input } from 'webmidi';
import { MIDI_INPUT } from '$stores/models/settingsModel';
import { db } from '$stores';


export async function onMidiConnected(e: PortEvent) {
    if (e.port.type !== 'input') {
        return;
    }
    const [{ id, manufacturer, name }] = WebMidi.inputs.slice(-1);

    const midiInputSettings = await db.settings.get(MIDI_INPUT);

    if (!midiInputSettings?.value.enabled && midiInputSettings?.value.name === name) {
        db.settings.update(MIDI_INPUT, { value: { enabled: true, name, by: 'auto' } });
        return;
    }

    if (!midiInputSettings?.value.enabled && !midiInputSettings?.value.name) {
        // TODO trasition
        await db.inputMidi.put({
            id,
            manufacturer,
            name
        });

        db.settings.update(MIDI_INPUT, { value: { enabled: true, name, by: 'auto' } });
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
    if (e.port.type !== 'input') {
        return;
    }

    if (WebMidi.inputs.length === 0) {
        db.settings.update(MIDI_INPUT, { 'value.enabled': false });
        db.settings.update(MIDI_INPUT, { 'value.by': 'auto' });
        return;
    }

    const [{ id, manufacturer, name }] = WebMidi.inputs.slice(-1);
    
    await db.inputMidi.put({
        id,
        manufacturer,
        name
    });
    db.settings.update(MIDI_INPUT, { value: { enabled: true, name, by: 'auto' } });

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
        // WebMidi.addListener('enabled', (e) => {console.log('enabled', e)});
        // WebMidi.addListener('portschanged', (e) => {console.log('portschanged', e)});
        WebMidi.addListener('connected', onMidiConnected);
        WebMidi.addListener('disconnected', onMidiDisconnected);


        await WebMidi.enable();
        // console.log('enable');
    } catch (error) {
        return console.error('WebMidi could not be enabled.', error);
    }
}
