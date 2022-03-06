<script type="ts">
	import MenuCard from '$lib/home/MenuCard.svelte';
	import Search from '$lib/home/Search.svelte';
	import Header from 'src/components/Header.svelte';
	import type { IArticle } from 'src/types/types';
	import request from 'src/utils/request';

	const routes = [{ path: '/pokedex', id: 'pokedex', name: 'Pokedex' }];
	let promise = request<IArticle[]>('/api/articles');
</script>

<svelte:head>
	<title>Pokedex by flo</title>
</svelte:head>

<Header />
<div class="page">
	<section class="main">
		<h1>Quel est le Pokémon que tu recherches ?</h1>
		<Search />

		<div class="routes">
			{#each routes as route}
				<MenuCard {route} />
			{/each}
		</div>
	</section>

	<div class="separator" />
	<section class="news">
		<h3>Pokénews</h3>
		{#await promise}
			<div class="loader">Chargement...</div>
		{:then articles}
			<div class="articles">
				{#each articles as article}
					<a href={article.link} target="_blank">
						<div class="article">
							<div class="left">
								<span class="title"
									>{article.title.slice(0, 50)}
									{article.title.length > 50 ? '...' : ''}
								</span>
								<span class="date">{article.time}</span>
							</div>
							<div class="right">
								<img alt={article.title} src={article.image} />
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/await}
	</section>
</div>

<style type="scss">
	.page {
		height: 100vh;
	}
	.main {
		padding: 0 $main-h-padding 56px $main-h-padding;
		background-color: white;
		position: relative;
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px;
		z-index: 2;
	}

	.news {
		z-index: 1;
		padding: 0 26px;
		padding-top: 30px;
		position: relative;
		top: -20px;
		background-color: #f5f5f5;
	}
	h1 {
		font-weight: 900;
		font-size: 2em;
		font-style: normal;
		font-weight: 900;
		font-size: 30px;
		line-height: 42px;
		margin: 0;
		margin-bottom: 40px;
	}
	.routes {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 10px;
		margin-top: 42px;
	}

	.articles {
		a {
			display: block;
			text-decoration: none;
			color: black;
		}
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		row-gap: 25px;
		.article {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				height: 65px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					font-weight: 700;
					font-size: 14px;
					max-width: 170px;
				}
				.date {
					font-size: 10px;
					font-weight: lighter;
					color: #7f848a;
				}
			}

			.right {
				img {
					height: 66px;
					border-radius: 15px;
				}
			}
		}
	}
</style>
