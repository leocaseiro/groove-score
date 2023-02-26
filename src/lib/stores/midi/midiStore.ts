import Dexie from 'dexie';
import { defaultNotes, type INote } from './midiModel';

class MidiDatabase extends Dexie {
    notes!: Dexie.Table<INote, string>;

    constructor () {
        super('gs-midi-database');
        this.version(1).stores({
            notes: 'sound, abc, *midi, part'
        });
    }
}

export const db = new MidiDatabase();

db.on('populate', () => {
    db.notes.bulkAdd(defaultNotes);
});
