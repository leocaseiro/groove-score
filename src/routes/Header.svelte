<script lang="ts">
	import Button from '@smui/button';
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import Tooltip, { Wrapper } from '@smui/tooltip';

	import { base } from '$app/paths';
	import { darkTheme, drawer, midiUsb } from '$stores';
	import USBMidiSettingsDialog from '$components/USBMidiSettingsDialog.svelte';

	let open: Boolean = false;
	let topAppBar: TopAppBar;
</script>
<USBMidiSettingsDialog bind:open={open} />
<TopAppBar class="mdc-elevation--z4" bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
			<IconButton on:click={drawer.toggle} class="material-icons">menu</IconButton>
			<Title><Button title="Groove Score" href="{base}/">Groove Score</Button></Title>
		</Section>
		<Section align="end" toolbar>
			<Wrapper>
				<IconButton on:click={() => (open = true)} class="material-icons" aria-label="Midi">{$midiUsb ? 'usb' : 'usb_off'}</IconButton>
				<Tooltip xPos="start">MIDI</Tooltip>
			</Wrapper>
			<Wrapper>
				<IconButton on:click={darkTheme.toggle} class="material-icons" aria-label={$darkTheme ? 'enable light theme' : 'enable dark theme'}>{$darkTheme ? 'light_mode' : 'dark_mode'}</IconButton>
				<Tooltip xPos="start">{$darkTheme ? 'light theme' : 'dark theme'}</Tooltip>
			</Wrapper>
			<!-- <IconButton class="material-icons" aria-label="Print this page">dark_mode</IconButton> -->
			<!-- <IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton> -->
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<slot />
</AutoAdjust>

<style>
	/* Hide everything above this component. */
	:global(#smui-app),
	:global(body),
	:global(html) {
		display: block !important;
		height: auto !important;
		width: auto !important;
		position: static !important;
	}
</style>
