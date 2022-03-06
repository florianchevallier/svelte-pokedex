<script context="module">
	import loadMiddleware from '$lib/middleware/load';
	export const load = loadMiddleware;
</script>

<script lang="ts">
	import Header from 'src/components/Header.svelte';
	import request from 'src/utils/request';
	import type { IUser } from '../api/_db';
	export let user: IUser;
	let promise = request<IUser>('/api/space');
</script>

<Header />

<div class="space">
	<h1>Benvenue sur ton espace, {user.username}</h1>
	<p>Retrouve ici tous les pokémons que tu as gardés en favoris, et bien d'autres !</p>

	{#await promise}
		<p>Chargement des infos</p>
	{:then user}
		<div>
			{user.username}
		</div>
	{:catch error}
		<div>
			{error.message}
		</div>
	{/await}
</div>

<style lang="scss">
	.space {
		padding: 0 $main-h-padding;
	}
</style>
