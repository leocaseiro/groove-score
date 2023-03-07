import { WebMidi, type PortEvent, type Input } from 'webmidi';

function onMidiConnected(e: PortEvent) {
    console.log('onMidiConnected.e', e);
    if (e.port.type !== 'input') {
        return;
    }

    console.log('onMidiConnected', (WebMidi.inputs as Input[]));
    // midiInputs.set()
    // if (selectedInput === 'all' || selectedInput === e.port.name) {
    //   addInputListener(e.port)
    // }
}

function onMidiDisconnected(e: PortEvent) {
    console.log('onMidiDisconnected.e', e);
    if (e.port.type !== 'input') {
        return;
    }
    console.log('onMidiDisconnected', (WebMidi.inputs as Input[]));

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

export async function loadMidi() {
    try {
        WebMidi.addListener('enabled', (e) => {console.log('enabled', e)});
        // WebMidi.addListener('portschanged', (e) => {console.log('portschanged', e)});
        WebMidi.addListener('connected', onMidiConnected);
        WebMidi.addListener('disconnected', onMidiDisconnected);


        await WebMidi.enable();
        console.log('enable');
    } catch (error) {
        return console.error('WebMidi could not be enabled.', error);
    }
}
