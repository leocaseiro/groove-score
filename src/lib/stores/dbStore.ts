import Dexie from 'dexie';
import { defaultNotes, type Note } from './models/midiModel';
import { defaultSettings, type Setting } from './models/settingsModel';
import { defaultTunes, type Tune } from './models/tuneModel';
import type { MidiInput } from './models/midiInputModel';

class GrooveScoreDatabase extends Dexie {
    notes!: Dexie.Table<Note, string>;
    tunes!: Dexie.Table<Tune, string>;
    inputMidi!: Dexie.Table<MidiInput, string>;
    settings!: Dexie.Table<Setting, string>;

    constructor () {
        super('gs-midi-database');
        this.version(1).stores({
            notes: 'sound, abc, *midi, part',
            tunes: '++id, author, title, *tags',
            inputMidi: 'name',
            settings: 'id',
        });
    }
}

export const db = new GrooveScoreDatabase();

db.on('populate', () => {
    db.notes.bulkAdd(defaultNotes);
    db.tunes.bulkAdd(defaultTunes);
    db.settings.bulkAdd(defaultSettings);
});
