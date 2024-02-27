import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function createUsers() {
	const users = Array.from({ length: 5 }).map(() => ({
		name: faker.person.firstName(),
		surname: faker.person.lastName(),
		email: faker.internet.email(),
		password: faker.internet.password(), // NOTE: Normally it should be hashed.
	}));

	await prisma.user.createMany({
		data: users,
	});
}

async function main() {
	createUsers();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
