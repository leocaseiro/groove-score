<script lang="ts">
	import { Content, Header, Title, Subtitle } from '@smui/drawer';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';

	import { base } from '$app/paths';
	import { drawer } from '$stores';

	let active = 'Inbox';

	function setActive(value: string) {
		active = value;
		drawer.set(false);
	}

	interface Link {
		url: string;
		icon: string;
		title: string;
		subList?: Link[];
	}

	const appPages: Link[] = [
		{
			title: 'About',
			url: 'about',
			icon: 'info'
		},
		// {
		//     title: 'Lessons',
		//     url: 'lessons',
		//     icon: 'school',
		// },
		// {
		//     title: 'Exercises',
		//     url: 'exercises',
		//     icon: 'science',
		// },
		// {
		//     title: 'Beats',
		//     url: 'beats',
		//     icon: 'spatial_tracking',
		// },
		// {
		//     title: 'Songs',
		//     url: 'songs',
		//     icon: 'music_note',
		// },
		{
		    title: 'Settings',
		    url: 'settings',
		    icon: 'settings',
			subList: [
				{
					title: 'Map Midi',
					url: 'settings/map-midi',
					icon: 'usb',
				}
			]
		},
	];

	const bookmarks: Link[] = [
		{ title: 'Rock', url: 'javascript:void(0)', icon: 'bookmark' },
		{ title: 'Punk Rock - Beat 1', url: 'javascript:void(0)', icon: 'bookmark' }
	];
</script>

<Header>
	<Title>Groove Score</Title>
	<Subtitle>write and practice drum notation</Subtitle>
</Header>
<Content>
	<List>
		{#each appPages as item}
			<Item
				href="{base}/{item.url}"
				on:click={() => setActive(item.title)}
				activated={active === item.title}
			>
				<Graphic class="material-icons" aria-hidden="true">{item.icon}</Graphic>
				<Text>{item.title}</Text>
			</Item>

			{#if item.subList}
			<Item wrapper>
				<List class="sub-list">
					{#each item.subList as subItem}
					<Item
						href="{base}/{subItem.url}"
						on:click={() => setActive(subItem.title)}
						activated={active === subItem.title}
					>
						<Graphic class="material-icons" aria-hidden="true">{subItem.icon}</Graphic>
						<Text>{subItem.title}</Text>
					</Item>
					{/each}
				</List>
			</Item>
			{/if}
		{/each}

		<Separator />
		<Subheader tag="h6">Bookmarks</Subheader>
		{#each bookmarks as item}
			<Item
				href={item.url}
				on:click={() => setActive(item.title)}
				activated={active === item.title}
			>
				<Graphic class="material-icons" aria-hidden="true">{item.icon}</Graphic>
				<Text>{item.title}</Text>
			</Item>
		{/each}
	</List>
</Content>
