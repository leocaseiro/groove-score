type G = {
    [key: string]: number | boolean | string | null;
}
export type Setting<T = G> = {
    id: string;
    value: T;
};

export const defaultSettings: Setting[] = [
    {
        id: 'midi_input',
        value: {
            enabled: false,
            by: 'auto',
            obj_id: null,
        },
    }
];
