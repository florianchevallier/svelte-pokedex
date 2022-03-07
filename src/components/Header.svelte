<script type="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import type { IUser } from 'src/routes/api/_db';
	import request from 'src/utils/request';
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	export let white: boolean = false;
	export let to = '/';

	let src = '/assets/pokeball-menu.svg';
	const hasHistory = typeof window !== 'undefined' && history.length > 1;
	const isHome = $page.url.pathname === '/';
	let isConnected = false;

	onMount(async () => {
		const user = await request<IUser>('/api/session');
		isConnected = !!user?.username || false;
	});
</script>

<div class="header {$$props.class}">
	{#if hasHistory && !isHome}
		<Icon
			stroke={white ? '#FFF' : '#000'}
			on:click={() => goto(to)}
			name="arrow-left"
			strokeWidth="3"
		/>
	{:else}
		<div />
	{/if}
	<a href={isConnected ? '/space' : '/login'} class="user">
		<Icon stroke={white ? '#FFF' : '#000'} name="user" strokeWidth="3" />
	</a>
	<img {src} alt="pokeball" />
</div>

<style lang="scss">
	.header {
		position: relative;
		padding: 51px $main-h-padding 30px $main-h-padding;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		z-index: 1000;

		&.white {
			.arrow-left {
				fill: #fff;
			}
		}
	}
	.user {
		text-align: right;
		z-index: 1001;
	}
	img {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 999;
	}
</style>
