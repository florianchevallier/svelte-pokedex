<script lang="ts">
	export let route: { path: string; name: string; id: string };
	let pokesmall = '/assets/pokesmall.svg';
</script>

<a href={route.path}>
	<div class="route-card {route.id}">
		<img class="pokesmall-left" alt={route.name} src={pokesmall} />
		<span>{route.name}</span>
		<img class="pokesmall" alt={route.name} src={pokesmall} />
	</div>
</a>

<style lang="scss">
	a {
		text-decoration: none;
	}
	.route-card {
		position: relative;
		padding: 24px 16px;
		border-radius: 15px;

		&.pokedex {
			background: linear-gradient(0deg, #4fc1a6, #4fc1a6),
				linear-gradient(7.97deg, #64a9fa -0.55%, #6dc1fd 107.61%);
			border-radius: 14px;
			font-style: normal;
			font-weight: bold;
			font-size: 14px;
			color: #ffffff;
		}
		.pokesmall {
			position: absolute;
			right: -30px;
			top: 0;
		}
		.pokesmall-left {
			position: absolute;
			left: -35px;
			top: -60px;
		}
	}
</style>
