import Prisma from '@prisma/client';

const prisma = new Prisma.PrismaClient();

export async function put(request) {
	await prisma.$connect();

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
	await prisma.$connect();

	const { id } = request.params;
	await prisma.todo.delete({ where: { id: parseInt(id) } });

	return {
		status: 200,
		body: {
			success: true
		}
	};
}
