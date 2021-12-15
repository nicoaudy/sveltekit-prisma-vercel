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

		getTodos();
		loading = false;
	}

	async function getTodos() {
		const response = await fetch('/api/todos.json');
		const result = await response.json();

		todos = result.data;
	}

	async function toggle(id) {
		await fetch(`/api/todo/${id}`, {
			method: 'put'
		});
		getTodos();
	}

	async function remove(id) {
		await fetch(`/api/todo/${id}`, {
			method: 'delete'
		});
		getTodos();
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
			<span class:done={todo.done}>{todo.name}</span>
			<div>
				<button class="done" on:click|preventDefault={toggle(todo.id)}>👌</button>
				<button class="remove" on:click|preventDefault={remove(todo.id)}> 🗑 </button>
			</div>
		</li>
	{/each}
</ul>
