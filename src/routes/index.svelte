<script>
	import { onMount } from 'svelte';

	let loading = false;
	let todos = [];

	onMount(() => {
		getTodos();
	});

	async function save(e) {
		loading = true;

		await fetch('/api/todos.json', {
			method: 'post',
			body: new FormData(e.target)
		});

		setTimeout(() => (loading = false), 3000);
	}

	async function getTodos() {
		const response = await fetch('/api/todos.json');
		const result = await response.json();
		console.log(result);
	}
</script>

<h1>SvelteKit-Prisma-Vercel🥳</h1>

<form on:submit|preventDefault={save}>
	<input type="text" name="todo" placeholder="Todo Name..." />
	<button disabled={loading} type="submit">{loading ? 'Loading...' : 'Save'}</button>
</form>

<ul>
	{#each todos as todo}
		<li class="card-link">
			<a href="/" class="link">{todo.name}</a>
		</li>
	{/each}
</ul>
