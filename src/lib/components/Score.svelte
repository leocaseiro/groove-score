<script>
    import { onMount } from 'svelte';
  
    export let score = {
      notes: [],
      missed: 0,
      early: 0,
      perfect: 0,
      late: 0,
      misplayed: 0,
      streak: 0,
      totalOfPoints: 0,
    };
</script>

<div>
    <table>
        <thead>
            <tr>
                <th>Note</th>
                <th>Timing Accuracy (ms)</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {#each score.notes as { note, timingAccuracy, score }}
                <tr>
                    <td>{note.pitch}</td>
                    <td>{timingAccuracy}</td>
                    <td>{score}</td>
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <td>Total</td>
                <td />
                <td>{score.totalOfPoints}</td>
            </tr>
        </tfoot>
    </table>
</div>
