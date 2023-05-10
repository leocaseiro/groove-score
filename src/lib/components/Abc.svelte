<script lang="ts">
    import 'abcjs/abcjs-audio.css';

    import { loadTune, loadAudio } from '$actions/abc/abcjsAction';
    import Score from './Score.svelte';
    import AbcAudio from './AbcAudio.svelte';
    import AbcTune from './AbcTune.svelte';
    import type { TuneObject, SynthObjectController } from 'abcjs';

    let midiPitches;
    let currentTime;
    let millisecondsPerMeasure;
    let visualObj: TuneObject;
    let synthControl: SynthObjectController;

    const onEventCallback = (synthControl, eventCurrentTime, currentNoteTimings) => {
        midiPitches = currentNoteTimings.midiPitches;
        currentTime = eventCurrentTime;
        millisecondsPerMeasure = currentNoteTimings.millisecondsPerMeasure;
        console.log('onEvent', { synthControl, currentTime, currentNoteTimings, midiPitches, currentTime, millisecondsPerMeasure });
    }

    function onUpdateVisualObj(event: CustomEvent) {
        visualObj = event.detail;
    }
  
    let score = {
      notes: [],
      missed: 0,
      early: 0,
      perfect: 0,
      late: 0,
      misplayed: 0,
      streak: 0,
      totalOfPoints: 0,
    };
  
    function onNoteEvent() {
        // midiPitches.forEach(note => {
        //     const timingAccuracy = note.start * millisecondsPerMeasure - currentTime;

        //     // Find the previous note
        //     const previousNote = midiPitches.find(n => n !== note && n.start < note.start);

        //     if (previousNote && previousNote.start + previousNote.duration * millisecondsPerMeasure > currentTime) {
        //         // If the previous note is still playing, count the hit as early
        //         score.early++;
        //         score.streak = 0;
        //     } else if (timingAccuracy < -300) {
        //         // If the hit is very late and no previous note is playing, count as missed
        //         score.notes.push({ note, timingAccuracy, score: 0 });
        //         score.missed++;
        //         score.streak = 0;
        //     } else if (timingAccuracy < -50) {
        //         score.notes.push({ note, timingAccuracy, score: 1 });
        //         score.early++;
        //         score.streak = 0;
        //     } else if (timingAccuracy <= 50) {
        //         score.notes.push({ note, timingAccuracy, score: 2 + 2 * score.streak });
        //         score.perfect++;
        //         score.streak++;
        //         score.totalOfPoints += 100 + 50 * score.streak;
        //     } else if (timingAccuracy <= 300) {
        //         score.notes.push({ note, timingAccuracy, score: 1 });
        //         score.late++;
        //         score.streak = 0;
        //     } else {
        //         score.notes.push({ note, timingAccuracy, score: 0 });
        //         score.misplayed++;
        //         score.streak = 0;
        //     }
        // });
    }

    export let title: string;
    export let value: string;

    function setAbcTuneNode(event: CustomEvent) {
        abcEl = event.detail;
    }

    let abcEl: HTMLElement;
</script>

<div>
    <!-- <div id={abcEl} use:loadTune={{ value, title }} /> -->
    <AbcTune on:setAbcTune-node={setAbcTuneNode} synthControl={synthControl} value={value} title={title} />
    {#if abcEl}
        <AbcAudio abcEl={abcEl} onEventCallback={onEventCallback} />
    {/if}
    
    
    <!-- <div use:loadAudio={{abcEl, onEventCallback}} /> -->
    <button on:click={() => onNoteEvent()}>EVENT</button>
    <textarea bind:value />
    <!-- <Score score={score} /> -->
</div>

<style>
    textarea {
        margin: 1em;
        width: 98vw;
        height: 50px;
    }
</style>
