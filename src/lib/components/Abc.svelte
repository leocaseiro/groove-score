<script lang="ts">
    import 'abcjs/abcjs-audio.css';

    import { loadTune, loadAudio } from '$actions/abc/abcjsAction';

    const abcEl = 'abc-notation';

    export let title: string;
    export let value: string;
</script>

<main>
    <div id={abcEl} use:loadTune={{value, title}} />
    <div use:loadAudio={abcEl} />
    <textarea bind:value />
</main>

<style>
    textarea {
        margin: 1em;
        width: 98vw;
        height: 50px;
    }
</style>
