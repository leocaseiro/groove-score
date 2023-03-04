import Dexie from 'dexie';
import { defaultNotes, type Note } from './models/midiModel';
import { defaultTunes, type Tune } from './models/songModel';

class GrooveScoreDatabase extends Dexie {
    notes!: Dexie.Table<Note, string>;
    tunes!: Dexie.Table<Tune, string>;

    constructor () {
        super('gs-midi-database');
        this.version(1).stores({
            notes: 'sound, abc, *midi, part',
            tunes: '++id, author, title, *tags',
        });
    }
}

export const db = new GrooveScoreDatabase();

db.on('populate', () => {
    db.notes.bulkAdd(defaultNotes);
    db.tunes.bulkAdd(defaultTunes);
});
