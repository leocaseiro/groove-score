type G = {
    [key: string]: number | boolean | string | null;
}

export type Setting<T> = {
    id: string;
    value: T;
};

export const MIDI_INPUT = 'midi_input';

export type MidiInputSettings = {
    name: string;
    enabled: boolean;
    by: 'auto' | 'manual';
};

export const defaultSettings: Setting<MidiInputSettings>[] = [
    {
        id: MIDI_INPUT,
        value: {
            enabled: false,
            by: 'auto',
            name: '',
        },
    }
];
