import { prisma } from '$lib/prisma';

export async function get(request) {
	const todos = await prisma.todo.findMany({});

	return {
		status: 200,
		body: {
			success: true,
			data: todos
		}
	};
}

export async function post(request) {
	const name = request.body.get('todo');
	const data = await prisma.todo.create({ data: { name } });

	return {
		status: 200,
		body: {
			success: true,
			data
		}
	};
}
