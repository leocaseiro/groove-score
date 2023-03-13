import { WebMidi, type PortEvent } from 'webmidi';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { onMidiConnected, onMidiDisconnected, loadMidi } from './webmidi';

describe('actions/webmidi', () => {
    it('should add event listeners on loadMidi', () => {
        vi.spyOn(WebMidi, 'addListener');

        loadMidi();

        expect(WebMidi.addListener).toHaveBeenNthCalledWith(1, 'connected', onMidiConnected);
        expect(WebMidi.addListener).toHaveBeenNthCalledWith(2, 'disconnected', onMidiDisconnected);
    });

    describe('onMidiConnected', () => {
        it('should ignore any types that are not input', () => {
            const EXPECTED = onMidiConnected(({ port : { type : 'xxx' } } as PortEvent));

            expect(EXPECTED).toBe(undefined);
        });

        it('should enable midi if no input_midi in DB', () => {

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
