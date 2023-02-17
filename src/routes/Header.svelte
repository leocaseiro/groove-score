<script lang="ts">
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import IconButton from '@smui/icon-button';

	import { darkTheme } from '$stores';

	let topAppBar: TopAppBar;
</script>

<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<Title>Groove Score</Title>
		</Section>
		<Section align="end" toolbar>
			<Wrapper>
				<IconButton on:click={darkTheme.toggle} class="material-icons" aria-label={$darkTheme ? 'enable Light Mode' : 'enable Dark Mode'}>{$darkTheme ? 'light_mode' : 'dark_mode'}</IconButton>
				<Tooltip xPos="start">{$darkTheme ? 'enable Light Mode' : 'enable Dark Mode'}</Tooltip>
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
