import { WebMidi, type PortEvent } from 'webmidi';
import { MIDI_INPUT } from '$stores/models/settingsModel';
import { db } from '$stores';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { onMidiConnected, onMidiDisconnected, loadMidi, onStateChanged } from './webmidi';

/**
 * onPortsChanged
 * 1. check if there is a current input is still connected
 * 1.1a if no longer connected, disconnect
 * 1.1b check if any other inputs
 * 1.1b.a if no other inputs, disconnect
 * 1.1b.b if other input
 * 
 * onDisconnect
 * remove listeners
 * update DB
*      
 * 
 */

describe('actions/webmidi', () => {
    it('should add event listeners on loadMidi', () => {
        vi.spyOn(WebMidi, 'addListener');

        loadMidi();

        expect(WebMidi.addListener).toHaveBeenNthCalledWith(1, 'portchanged', onStateChanged);
        // expect(WebMidi.addListener).toHaveBeenNthCalledWith(2, 'connected', onMidiConnected);
        // expect(WebMidi.addListener).toHaveBeenNthCalledWith(3, 'disconnected', onMidiDisconnected);
    });

    describe('onMidiConnected', () => {
        afterEach(() => {
            vi.restoreAllMocks()
        })

        it('should ignore any types that are not input', () => {
            const EXPECTED = onMidiConnected(({ port : { type : 'xxx' } } as PortEvent));

            expect(EXPECTED).toBe(undefined);
        });

        it('should enable midi if no midi_input in DB', async () => {
            vi.spyOn(db.settings, 'get')
                .mockResolvedValue({
                    value: {
                        enabled: false,
                        name: null,
                    }
                });
            vi.spyOn(db.settings, 'update');

            await db.settings.get(MIDI_INPUT);

            onMidiConnected(({ port : { type : 'xxx' } } as PortEvent));

            expect(db.settings.update).toHaveBeenCalledWith({});
        });

        it('should set latest Input as the default one if no midi is set yet', () => {

        });

        it('should ask if user wants to change the input when other input is already connected', () => {

        });

        it('should ask if user wants to enable midi, if settings disabled for input_midi manual in DB', () => {

        });
    });

    describe('onMidiDisconnected', () => {
        it('should ignore any types that are not input', () => {
            const EXPECTED = onMidiDisconnected(({ port : { type : 'xxx' } } as PortEvent));

            expect(EXPECTED).toBe(undefined);
        });

        it('should set latest input available to use', () => {

        });

        it('should disable midi as auto if no more inputs are connected', () => {

        });
    });
});
