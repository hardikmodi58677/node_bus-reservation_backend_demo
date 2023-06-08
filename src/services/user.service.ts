import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getUserById(userId: number) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
		},
	})
	return user
}
