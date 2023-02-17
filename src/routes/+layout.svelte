<script lang="ts">
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import './styles.scss';

	import { base } from '$app/paths';
	import { darkTheme } from '$stores';

	onMount(() => {
		darkTheme.set(!!window.matchMedia('(prefers-color-scheme: dark'));
	});
</script>

<svelte:head>
	<!-- SMUI Styles -->
	{#if $darkTheme === undefined}
		<link rel="stylesheet" href="{base}/smui.css" media="(prefers-color-scheme: light)" />
		<link rel="stylesheet" href="{base}/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
	{:else if $darkTheme}
		<link rel="stylesheet" href="{base}/smui.css" />
		<link rel="stylesheet" href="{base}/smui-dark.css" />
	{:else}
		<link rel="stylesheet" href="{base}/smui.css" />
	{/if}
</svelte:head>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>
