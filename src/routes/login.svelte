<script context="module">
	import loadMiddleware from '$lib/middleware/load';
	export const load = loadMiddleware;
</script>

<script lang="ts">
	import Header from 'src/components/Header.svelte';
	import request, { ValidationError } from 'src/utils/request';
	let user: string;
	let password: string;
	let errorMessage: string;

	async function handleSubmit() {
		try {
			await request('/api/login', {
				method: 'POST',
				body: JSON.stringify({
					user,
					password
				})
			});
			errorMessage = '';
			window.location.href = '/space';
		} catch (err) {
			if (err instanceof ValidationError) {
				errorMessage = err.message;
			} else {
				errorMessage = 'Une erreur est survenue, merci de réessayer';
			}
		}
	}
</script>

<Header />
<div class="page">
	<h1>Connexion</h1>
	<h3>Connecte-toi pour garder ton pokémon en favoris !</h3>
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
	<form class="login" on:submit|preventDefault|stopPropagation={handleSubmit}>
		<input placeholder="e-mail" bind:value={user} type="text" name="username" id="username" />
		<input
			placeholder="mot de passe"
			bind:value={password}
			type="password"
			name="password"
			id="password"
		/>
		<button on:click|once type="submit">Envoyer</button>
	</form>
</div>

<style lang="scss">
	.page {
		padding: 0 $main-h-padding;
	}
	.error {
		background-color: $pkcolor-red;
		color: $pkcolor-white;
		padding: 20px 10px;
		border-radius: 20px;
		text-align: center;
	}
	.login {
		display: flex;
		flex-direction: column;
		row-gap: 20px;

		input {
			border: none;
			background-color: #f5f5f5;
			padding: 10px 20px;
			border-radius: 32px;
			min-width: 200px;
		}

		button {
			border: none;
			border-radius: 32px;
			background-color: $pkcolor-yellow;
			padding: 15px 20px;
			align-self: center;
			widows: fix-content;
		}
	}
</style>
