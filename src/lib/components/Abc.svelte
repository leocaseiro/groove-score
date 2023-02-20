<script>
    import "abcjs/abcjs-audio.css";

    import { loadTune, loadAudio } from '$actions/abc/abcjsAction';

    const abcEl = 'abc-notation';

    let value = `[Fg]g [cg]g [Fg][Fg] [cg]g | [Fg]g [cg]g [Fg]g [cg]g`;
    </script>
    <style>
        textarea {
          margin: 1em;
          width: 98vw;
          height: 50px;
        }
    </style>

    <main>
      <div id={abcEl} use:loadTune={value}></div>
      <div use:loadAudio={abcEl}></div>
      <textarea bind:value></textarea>
    </main>
