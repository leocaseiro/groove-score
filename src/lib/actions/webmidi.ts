import { WebMidi, type PortEvent, type Input } from 'webmidi';
import { MIDI_INPUT, type MidiInputSettings } from '$stores/models/settingsModel';
import { db, midiInputs } from '$stores';


export async function onMidiConnected(e: PortEvent) {
    if (e.port.type !== 'input') {
        return;
    }
    const [{ name }] = WebMidi.inputs.slice(-1);

    const inputs = WebMidi.inputs.map(({ id, manufacturer, name })=> ({ id, manufacturer, name }));
    midiInputs.set(inputs);

    const { value: { enabled, by } }: {value: MidiInputSettings} = await db.settings.get(MIDI_INPUT);

    if (enabled) {
        return;
    }

    if (by === 'manual') {
        // TODO
        console.log('show midi input settings/dialog');
        return;
    }

    db.settings.update(MIDI_INPUT, { value: { enabled: true, name, by: 'auto' } });

    // midiInputs.set()
    // if (selectedInput === 'all' || selectedInput === e.port.name) {
    //   addInputListener(e.port)
    // }
}

export async function onMidiDisconnected(e: PortEvent) {
    if (e.port.type !== 'input') {
        return;
    }

    const inputs = WebMidi.inputs.map(({ id, manufacturer, name })=> ({ id, manufacturer, name }));
    midiInputs.set(inputs);

    if (WebMidi.inputs.length === 0) {
        db.settings.update(MIDI_INPUT, { 'value.enabled': false });
        db.settings.update(MIDI_INPUT, { 'value.by': 'auto' });
        return;
    }

    const [{ name }] = WebMidi.inputs.slice(-1);

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
        // alert('enable');
    } catch (error) {
        alert('WebMidi could not be enabled.');
        return console.error('WebMidi could not be enabled.', error);
    }
}
