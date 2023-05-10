<script lang="ts">
    import ABCJS, { type AbcElem, type ClickListenerAnalysis, type ClickListenerDrag, type EventCallback } from 'abcjs';
    import { onMount } from "svelte";
    import { CursorControl } from '$actions/abc/CursorControl';

    type CursoControlWithSynth = ABCJS.CursorControl & { setSynth: (synth: ABCJS.SynthObjectController) => void };
    let synthControl: ABCJS.SynthObjectController;
    export let abcEl: HTMLElement;

    function clickListener(
        abcElem: AbcElem,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _tuneNumber: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _classes: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _analysis: ClickListenerAnalysis,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _drag: ClickListenerDrag
    ): void {
        if (!abcElem) {
            return;
        }

        // console.log({
        //     currentTrackMilliseconds: (abcElem as any).currentTrackMilliseconds,
        //     currentTrackWholeNotes: (abcElem as any).currentTrackWholeNotes,
        //     midiPitches: abcElem.midiPitches,
        //     gracenotes: abcElem.gracenotes,
        //     midiGraceNotePitches: abcElem.midiGraceNotePitches});

        const lastClicked = abcElem.midiPitches;
        if (!lastClicked) {
            return;
        }

        ABCJS.synth
            .playEvent(
                lastClicked,
                abcElem.midiGraceNotePitches as ABCJS.MidiGracePitches,
                // @ts-expect-error Property 'visualObj' does not exist on type 'SynthObjectController'.ts(2339)
                synthControl.visualObj.millisecondsPerMeasure()
            )
            .then(function (response) {
                // console.log('note played');
            })
            .catch(function (error) {
                console.error('error playing note', error);
            });
    }

    function loadAudio(audioEl: HTMLElement, props: { onEventCallback: EventCallback }) {
        const { onEventCallback } = props;
        const cursorControl: CursoControlWithSynth = new CursorControl(abcEl);

        if (ABCJS.synth.supportsAudio()) {
            synthControl = new ABCJS.synth.SynthController();
            // @ts-expect-error Argument of type 'HTMLElement' is not assignable to parameter of type 'string'.ts(2345)
            synthControl.load(audioEl, cursorControl, {
                displayLoop: true,
                displayRestart: true,
                displayPlay: true,
                displayProgress: true,
                displayWarp: true
            });

            cursorControl.setSynth(synthControl);
            // cursorControl.onEventCallback = onEventCallback;
            console.log({cursorControl, synthControl});

        //     synthControl.play();
        } else {
            if (audioEl) {
                audioEl.innerHTML =
                    "<div class='audio-error'>Audio is not supported in this browser.</div>";
            }
        }
    }

    let audioEl: HTMLElement;
    let onEventCallback: CustomEvent;

    onMount(() => {
        loadAudio(audioEl, { onEventCallback });
    });
</script>

<div bind:this="{audioEl}">
    <!-- The audio controls will be rendered here -->
</div>
