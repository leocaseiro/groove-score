<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
    $: tune = data.tune;

    import Abc from '$components/Abc.svelte';
</script>

{#if $tune}
    <Abc value={$tune.tune} title={$tune.title} />
{:else}
    <p>no tune</p>
{/if}
