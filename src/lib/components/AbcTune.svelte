<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import ABCJS, { type SynthObjectController } from 'abcjs';
    import AbcAudio from './AbcAudio.svelte';

    const dispatch = createEventDispatcher();

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
    let abcOptions = {}; // the original abcOptions without clickListener

    export let title = '';
    export let value = '';
    export let synthControl: SynthObjectController;
    
    function setAbcString(abc: string, title = 'Beat') {
        const abcTitle = `X:1\nT:${title}\n`;
        abcString = abcTitle + abcStringPrefix + abc;
    }

    function setTune(node: HTMLElement, userAction: boolean) {
        if (!node) {
            return;
        }

        if (synthControl) {
            synthControl.disable(true);
        }
        
        const visualObjs = ABCJS.renderAbc(node, abcString, abcOptions);
        
        const visualObj = visualObjs[0] ?? null;
        if (!visualObj) {
            return;
        }
        
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
                            console.log('response', response);
                            console.log('Audio successfully loaded.');
                            console.log({synthControl})
                            console.log({midiBuffer})
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

    let node: HTMLElement;

    onMount(() => {
        dispatch('setAbcTune-node', node);
        setAbcString(value, title);
        setTune(node, false);
    });

    $: {
        setAbcString(value, title);
        setTune(node, true);
    }
</script>

<div bind:this="{node}">
    <!-- The sheet music will be rendered here -->
</div>

<!-- <AbcAudio abcEl={node} /> -->
