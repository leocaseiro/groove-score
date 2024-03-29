type MidiVariations = {
    default: number[];
    [key: string]: number[];
};

type AbcVariations = {
    default: {
        abc: string;
        abcStyle?: string;
    };
    [key: string]: {
        abc: string;
        abcStyle?: string;
    };
};

enum Part {
    'bass' = 'bass',
    'closed hi-hat' = 'closed hi-hat',
    'cowbell' = 'cowbell',
    'crash' = 'crash',
    'open hi-hat' = 'open hi-hat',
    'open triangle' = 'open triangle',
    'pedal hi-hat' = 'pedal hi-hat',
    'ride bell' = 'ride bell',
    'ride' = 'ride',
    'snare rim-shot' = 'snare rim-shot',
    'snare' = 'snare',
    'tambourine' = 'tambourine',
    'tom1' = 'tom1',
    'tom2' = 'tom2',
    'tom3' = 'tom3',
    'triangle' = 'triangle',
    'wood block' = 'wood block'
}

export type Note = {
    abc: string;
    abcStyle?: string;
    abcVariations?: AbcVariations;
    label: string;
    midi: number[];
    midiVariations?: MidiVariations;
    name: string;
    short: string;
    enabled: boolean;
    sound: string;
    part: Part;
};

export const defaultNotes: Note[] = [
    {
        abc: '_c',
        label: 'Electric Snare',
        midi: [40, 80, 90], // fake test
        // midi: [40],
        name: 'electric-snare',
        short: 'SN',
        enabled: false,
        sound: 'electric-snare',
        part: Part.snare
    },
    {
        abc: 'c',
        label: 'Snare',
        midi: [38],
        name: 'acoustic-snare',
        short: 'SN',
        enabled: true,
        sound: 'acoustic-snare',
        part: Part.snare
    },
    {
        abc: '=c',
        abcStyle: 'x',
        label: 'Rim Shot',
        midi: [37],
        name: 'side-stick',
        short: 'RS',
        enabled: false,
        sound: 'side-stick',
        part: Part['snare rim-shot']
    },
    {
        abc: 'E',
        label: 'Bass',
        midi: [35],
        name: 'acoustic-bass-drum',
        short: 'BD',
        enabled: true,
        sound: 'acoustic-bass-drum',
        part: Part.bass
    },
    {
        abc: 'F',
        label: 'Bass',
        midi: [36],
        name: 'bass-drum',
        short: 'BS',
        enabled: false,
        sound: 'bass-drum-1',
        part: Part.bass
    },
    {
        abc: 'g',
        abcStyle: 'x',
        label: 'Closed Hi-hat',
        midi: [42],
        name: 'closed-hi-hat',
        short: 'CHH',
        enabled: true,
        sound: 'closed-hi-hat',
        part: Part['closed hi-hat']
    },
    {
        abc: `"^o"^g`,
        abcStyle: 'x',
        label: 'Open Hi-hat',
        midi: [46],
        name: 'open-hi-hat',
        short: 'OHH',
        enabled: true,
        sound: 'open-hi-hat',
        part: Part['open hi-hat']
    },
    {
        abc: 'a',
        abcStyle: 'x',
        label: 'Ride',
        midi: [51],
        name: 'ride-cymbal',
        short: 'RD',
        enabled: true,
        sound: 'ride-cymbal-1',
        part: Part.ride
    },
    {
        abc: '_a',
        abcStyle: 'harmonic',
        label: 'Ride bell',
        midi: [53],
        name: 'ride-bell',
        short: 'RB',
        enabled: false,
        sound: 'ride-bell',
        part: Part['ride bell']
    },
    {
        abc: 'b',
        abcStyle: 'x',
        label: 'Crash',
        midi: [49],
        name: 'crash-cymbal',
        short: 'CR',
        enabled: true,
        sound: 'crash-cymbal-1',
        part: Part.crash
    },
    {
        abc: "!style=x!c'",
        abcStyle: 'x',
        label: 'Crash 2',
        midi: [57],
        name: 'crash-cymbal-2',
        short: 'CR',
        enabled: false,
        sound: 'crash-cymbal-2',
        part: Part.crash
    },
    {
        abc: '^d',
        abcStyle: 'triangle',
        label: 'High Wood Block',
        midi: [76],
        name: 'hi-wood-block',
        short: 'HW',
        enabled: false,
        sound: 'hi-wood-block',
        part: Part['wood block']
    },
    {
        abc: 'e',
        label: 'High Tom',
        midi: [48],
        name: 'hi-mid-tom',
        short: 'HT',
        enabled: true,
        sound: 'hi-mid-tom',
        part: Part.tom1
    },
    {
        abc: 'f',
        label: 'High Tom',
        midi: [50],
        name: 'high-tom',
        short: 'HT',
        enabled: true,
        sound: 'high-tom',
        part: Part.tom1
    },
    {
        abc: 'd',
        label: 'Low Tom',
        midi: [47],
        name: 'low-mid-tom',
        short: 'LM',
        enabled: true,
        sound: 'low-mid-tom',
        part: Part.tom2
    },
    {
        abc: 'B',
        label: 'Low Tom',
        midi: [45],
        name: 'low-tom',
        short: 'LT',
        enabled: true,
        sound: 'low-tom',
        part: Part.tom2
    },
    {
        abc: 'A',
        label: 'Floor Tom',
        midi: [43],
        name: 'high-floor-tom',
        short: 'FT',
        enabled: true,
        sound: 'high-floor-tom',
        part: Part.tom3
    },
    {
        abc: 'G',
        label: 'Low Floor Tom',
        midi: [41],
        name: 'low-floor-tom',
        short: 'FT',
        enabled: true,
        sound: 'low-floor-tom',
        part: Part.tom3
    },
    {
        abc: 'D',
        abcStyle: 'x',
        label: 'Pedal Hi-hat',
        midi: [44],
        name: 'pedal-hi-hat',
        short: 'PHH',
        enabled: true,
        sound: 'pedal-hi-hat',
        part: Part['pedal hi-hat']
    },
    {
        abc: '^B',
        abcStyle: 'triangle',
        label: 'Tambourine',
        midi: [54],
        name: 'tambourine',
        short: 'TB',
        enabled: true,
        sound: 'tambourine',
        part: Part.tambourine
    },
    {
        abc: '_C',
        abcStyle: 'triangle',
        label: 'Low Wood Block',
        midi: [77],
        name: 'low-wood-block',
        short: 'TB',
        enabled: false,
        sound: 'low-wood-block',
        part: Part['wood block']
    },
    {
        abc: '^e',
        abcStyle: 'triangle',
        label: 'Cowbell',
        midi: [56],
        name: 'cowbell',
        short: 'CB',
        enabled: false,
        sound: 'cowbell',
        part: Part.cowbell
    },
    {
        abc: '^a',
        abcStyle: 'triangle',
        label: 'Open Triangle',
        midi: [81],
        name: 'open-triangle',
        short: 'TR',
        enabled: false,
        sound: 'open-triangle',
        part: Part['open triangle']
    }
];
