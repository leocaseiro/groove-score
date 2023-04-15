import { get } from "svelte/store";
import { MIDI_INPUT } from '$stores/models/settingsModel';
import { db, midiInputs } from '$stores';

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
  // console.log('handleMidiMessage', event.data)
  const command = event.data[0];
  const timestamp = event.timeStamp;
  // note on
  if (command <= 144 && command <= 159) {
    const note = event.data[1];
    const velocity = event.data.length > 2 ? event.data[2] : 0;
    noteEvents = [{ note, timestamp, velocity }, ...noteEvents];
  }
};

export const getInputName = (input: MIDIInput) => {
    let inputName = input.name ? input.name : input.manufacturer;
    inputName = inputName ?? "Midi Input"; // Make sure there is always a name
    return inputName;
}

export const updateSelectedInput = (input: MIDIInput, by: 'auto' | 'manual' = 'auto') => {
  // console.log('updateSelectedInput', input);
  if (selectedInput !== input) {
    if (selectedInput) {
      // @ts-expect-error MIDIMessageEvent is different from Event
      selectedInput.removeEventListener("midimessage", handleMidiMessage);
    }
    selectedInput = input;
    // @ts-expect-error MIDIMessageEvent is different from Event
    selectedInput.addEventListener("midimessage", handleMidiMessage);

    db.settings.update(MIDI_INPUT, { value: { enabled: true, id: input.id, name: getInputName(input), by } });
  }
};

export const handleInputSelectChange = (event: Event) => {
  // console.log('handleSelectChange', event);
  const inputId = (event.target as HTMLSelectElement).value;
  const input = midiAccess!.inputs.get(inputId);
  if (input) {
    updateSelectedInput(input);
  }
};

export const disableMidiInput = () => {
    // remove any listeners
    db.settings.update(MIDI_INPUT, { 'value.enabled': false });
    db.settings.update(MIDI_INPUT, { 'value.by': 'auto' });
}

export async function loadMidi(_node) {
    console.log('node', _node);
  if (!navigator.requestMIDIAccess) {
    const err = "WebMidi API not supported on this browser.";
    alert(err);
    console.log(err);
    return;
  }

  try {
    midiAccess = await navigator.requestMIDIAccess();
    midiAccess.onstatechange = () => {
        console.log('onstatechange', midiAccess?.inputs);
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
          updateSelectedInput(inputs[0]);
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
    console.error("Failed to initialize MIDI: ", error);
  }
}
