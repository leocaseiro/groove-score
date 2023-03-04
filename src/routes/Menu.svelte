<script lang="ts">
	import { Content, Header, Title, Subtitle } from '@smui/drawer';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import { liveQuery, type Observable } from "dexie";

	import { base } from '$app/paths';
    import { browser } from '$app/environment';
	import { drawer, db } from '$stores';

	type Link = {
		url: string;
		icon: string;
		title: string;
		subList?: Link[];
	}

    let bookmarks: Observable<Link[]>;
    bookmarks = liveQuery(
        async () => {
			if (!browser) {
				return [];
			}
			const tunes = await db.tunes.toArray();
			return tunes.map(({ id, title }) => (
				{ title, url: `${base}/tunes/${id}`, icon: 'bookmark' }
			));
		}
    );

	let active = 'Inbox';

	function setActive(value: string) {
		active = value;
		drawer.set(false);
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
					title: 'Midi',
					url: 'settings/midi',
					icon: 'usb',
				}
			]
		},
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

		{#if $bookmarks}
			<Separator />
			<Subheader tag="h6">Bookmarks</Subheader>
			{#each $bookmarks as item}
				<Item
					href={item.url}
					on:click={() => setActive(item.title)}
					activated={active === item.title}
				>
					<Graphic class="material-icons" aria-hidden="true">{item.icon}</Graphic>
					<Text>{item.title}</Text>
				</Item>
			{/each}
		{/if}


		<Separator />
		<Item
			on:click={() => db.delete()}
		>
			<Graphic class="material-icons" aria-hidden="true">delete</Graphic>
			<Text>Clear IndexedDB</Text>
		</Item>
	</List>
</Content>
