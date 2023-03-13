type G = {
    [key: string]: number | boolean | string | null;
}

export type Setting = {
    id: string;
    value: any;
};

export const MIDI_INPUT = 'midi_input';

export const defaultSettings: Setting[] = [
    {
        id: MIDI_INPUT,
        value: {
            enabled: false,
            by: 'auto',
            name: null,
        },
    }
];
