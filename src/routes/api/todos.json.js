import Prisma from '@prisma/client';

const prisma = new Prisma.PrismaClient();

export async function get(request) {
	await prisma.$connect();

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
	await prisma.$connect();

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
