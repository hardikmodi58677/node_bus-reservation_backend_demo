import { PrismaClient } from "@prisma/client"
export const prisma = new PrismaClient()
prisma
	.$connect()
	.then(() => {
		console.log("Database connected")
	})
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
