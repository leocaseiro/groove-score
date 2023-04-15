export type Tune = {
    id?: number;
    author: string;
    title: string;
    tune: string;
    tags: string[];
};

type NewTune = Omit<Tune, 'id'>;

export const defaultTunes: NewTune[] = [
    {
        author: 'Drum Teacher',
        title: 'Rock Beat #1',
        tune: `[Fg]g [cg]g [Fg]g [cg]g | [Fg]g [cg]g [Fg]g [cg]g`,
        tags: ['rock', 'beat']
    },
    {
        author: 'Drum Teacher',
        title: 'Punk Rock Beat #1',
        tune: `"^o"[^gF]4 "^o"[^gc]4 "^o"[^gF]4 "^o"[^gc]4  | "^o"[^gF]4 "^o"[^gc]4 "^o"[^gF]4 "^o"[^gc]4`,
        tags: ['punk', 'rock', 'beat']
    },
    {
        author: 'Drum Teacher',
        title: 'Punk Rock Beat #2',
        tune: `"^o"[^gF]2 "^o"[^gc]2 "^o"[^gF]F "^o"[^gc]2 | "^o"[^gF]2 "^o"[^gc]2 "^o"[^gF]F "^o"[^gc]2`,
        tags: ['punk', 'rock', 'beat']
    },
    {
        author: 'Drum Teacher',
        title: 'Punk Rock Beat #3',
        tune: `"o"[F2^g2] "o"[c^g][F] "o"[^g][F] "o"[c2^g2] | "o"[F2^g2] "o"[c^g][F] "o"[^g][F] "o"[c2^g2]`,
        tags: ['punk', 'rock', 'beat']
    },
    {
        author: 'Drum Teacher',
        title: 'Punk Rock Beat #4',
        tune: `"o"[F^g][c] "o"[F^g][c] "o"[F^g][c] "o"[F^g][c] | "o"[F^g][c] "o"[F^g][c] "o"[F^g][c] "o"[F^g][c]`,
        tags: ['punk', 'rock', 'beat']
    },
    {
        author: 'Drum Teacher',
        title: 'Punk Rock Beat #5',
        tune: `"o"[c^g][F] "o"[c^g][F] "o"[c^g][F] "o"[c^g][F] | "o"[c^g][F] "o"[c^g][F] "o"[c^g][F] "o"[c^g][F]`,
        tags: ['punk', 'rock', 'beat']
    },
    {
        author: 'Drum Teacher',
        title: 'Punk Rock Beat #6',
        tune: `"o"[F^g][F] "o"[c^g][F] "o"[^g][F] "o"[c^g]2 | "o"[F^g][F] "o"[c^g][F] "o"[^g][F] "o"[c^g]2`,
        tags: ['punk', 'rock', 'beat']
    },
    {
        author: 'Drum Teacher',
        title: 'Punk Rock Beat #7',
        tune: `"^o"[^gF]2"^o"[^gc]2 "^o"[^gF]F"^o"[^gc]2 "^o"[^gF]2"^o"[^gc]F "^o"^gF"^o"[^gc]2  | "^o"[^gF]2"^o"[^gc]2 "^o"[^gF]F"^o"[^gc]2 "^o"[^gF]2"^o"[^gc]F "^o"^gF"^o"[^gc]2`,
        tags: ['punk', 'rock', 'beat']
    }
];
