import ABCJS, { type AbcElem, type ClickListenerAnalysis, type ClickListenerDrag } from 'abcjs';
import { CursorControl } from './CursorControl';

const abcStringPrefix = `%%barnumbers 1
%%stretchlast 1
%%percmap D  pedal-hi-hat x
%%percmap F  bass-drum-1
%%percmap E  acoustic-bass-drum
%%percmap G  low-floor-tom
%%percmap A  high-floor-tom
%%percmap B  low-tom
%%percmap ^B tambourine   triangle
%%percmap c  acoustic-snare
%%percmap _c electric-snare
%%percmap ^c low-wood-block   triangle
%%percmap =c side-stick x
%%percmap d  low-tom
%%percmap =d  low-mid-tom harmonic
%%percmap ^d hi-wood-block    triangle
%%percmap e  hi-mid-tom
%%percmap ^e cowbell      triangle
%%percmap f  high-tom
%%percmap ^f ride-cymbal-1
%%percmap =f ride-bell harmonic
%%percmap g  closed-hi-hat x
%%percmap ^g open-hi-hat x
%%percmap a  crash-cymbal-1  x
%%percmap ^a open-triangle     triangle
Q:1/4=120
K:C perc
V:ALL stem=up
`;

let abcString: string;

function setAbcString(abc: string, title = 'Beat') {
    const abcTitle = `X:1
T:${title}
`;
    abcString = abcTitle + abcStringPrefix + abc;
}

let synthControl: ABCJS.SynthObjectController;

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

const abcOptions: ABCJS.AbcVisualParams = {
    add_classes: true,
    clickListener: clickListener,
    responsive: 'resize'
};

type AbcTune = {
    value: string;
    title: string;
};
export function loadTune(node: HTMLElement, { value, title }: AbcTune) {
    setAbcString(value, title);
    setTune(node, false);

    return {
        update(v: AbcTune) {
            setAbcString(v.value, v.title);
            setTune(node, true);
        }
    };
}

export function loadAudio(audioEl: HTMLElement, abcEl: string) {
    const cursorControl: ABCJS.CursorControl = new CursorControl(abcEl);

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
    } else {
        if (audioEl) {
            audioEl.innerHTML =
                "<div class='audio-error'>Audio is not supported in this browser.</div>";
        }
    }
}

function setTune(node: HTMLElement, userAction: boolean) {
    if (synthControl) {
        synthControl.disable(true);
    }
    const visualObj = ABCJS.renderAbc(node, abcString, abcOptions)[0];

    // TODO-PER: This will allow the callback function to have access to timing info - this should be incorporated into the render at some point.
    const midiBuffer = new ABCJS.synth.CreateSynth();
    midiBuffer
        .init({
            visualObj: visualObj
        })
        .then(function (response) {
            // console.log(response);
            if (synthControl) {
                synthControl
                    .setTune(visualObj, userAction)
                    .then(function (response) {
                        // console.log('response', response);
                        // console.log('Audio successfully loaded.');
                    })
                    .catch(function (error) {
                        console.error('Audio problem:', error);
                    });
            }
        })
        .catch(function (error) {
            console.error('Audio problem:', error);
        });
}
