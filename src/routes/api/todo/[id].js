import { prisma } from '$lib/prisma';

export async function put(request) {
	const { id } = request.params;
	const row = await prisma.todo.findUnique({ where: { id: parseInt(id) } });
	const data = await prisma.todo.update({ where: { id: row.id }, data: { done: !row.done } });

	return {
		status: 200,
		body: {
			success: true,
			data
		}
	};
}

export async function del(request) {
	const { id } = request.params;
	await prisma.todo.delete({ where: { id: parseInt(id) } });

	return {
		status: 200,
		body: {
			success: true
		}
	};
}
