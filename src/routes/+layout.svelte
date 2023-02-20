<script lang="ts">
	import Drawer, { AppContent, Scrim } from '@smui/drawer';
	import { onMount } from 'svelte';

	import { base } from '$app/paths';
	import { darkTheme, drawer } from '$stores';

	import Header from './Header.svelte';
	import Menu from './Menu.svelte';
	import './styles.scss';

	let open = false;

	drawer.subscribe((v) => {
		open = v;
	});

	onMount(() => {
		darkTheme.set(!!window.matchMedia('(prefers-color-scheme: dark'));
	});
</script>

<svelte:head>
	<!-- SMUI Styles -->
	{#if $darkTheme === undefined}
		<link rel="stylesheet" href="{base}/smui.css" media="(prefers-color-scheme: light)" />
		<link
			rel="stylesheet"
			href="{base}/smui-dark.css"
			media="screen and (prefers-color-scheme: dark)"
		/>
	{:else if $darkTheme}
		<link rel="stylesheet" href="{base}/smui.css" />
		<link rel="stylesheet" href="{base}/smui-dark.css" />
	{:else}
		<link rel="stylesheet" href="{base}/smui.css" />
	{/if}
</svelte:head>

<Drawer variant="modal" fixed={false} bind:open>
	<Menu />
</Drawer>

<Scrim on:click={drawer.toggle} fixed={false} />
<AppContent class="app-content">
	<div class="app">
		<Header />

		<main>
			<slot />
		</main>
	</div>
</AppContent>
