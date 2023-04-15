<script lang="ts">
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    import { base } from '$app/paths';

    type Link = {
        url: string;
        icon: string;
        title: string;
        subList?: Link[];
    };

    const settingsPages: Link[] = [
        {
            title: 'Midi',
            url: 'settings/midi',
            icon: 'usb'
        }
    ];
</script>

<svelte:head>
    <title>Settings | Groove Score</title>
    <meta name="description" content="Settings for Groove Score" />
</svelte:head>

<div class="text-column">
    <h1>Settings</h1>
    <List>
        {#each settingsPages as item}
            <Item tag="a" href="{base}/{item.url}">
                <Graphic class="material-icons" aria-hidden="true">{item.icon}</Graphic>
                <Text>{item.title}</Text>
            </Item>
        {/each}
    </List>
</div>
