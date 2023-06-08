import { faker } from "@faker-js/faker"
import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function findTickets(where: Prisma.TicketFindManyArgs = {}) {
	return prisma.ticket.findMany({
		...where,
		select: {
			id: true,
			status: true,
			user: {
				select: {
					id: true,
					email: true,
					phone: true,
				},
			},
			seat: true,
		},
	})
}

export async function findTicketById(id: number) {
	return prisma.ticket.findUnique({
		where: { id },
		select: {
			id: true,
			status: true,
			user: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
					email: true,
					phone: true,
				},
			},
			seat: true,
		},
	})
}

export async function updateTicket(id: number, ticket: any) {
	let userObj = ticket.user ?? {}
	let data = {
		status: ticket.status,
	}

	if (userObj.id) {
		userObj = await prisma.user.update({
			where: { id: userObj.id },
			data: userObj,
		})
	}

	if (!userObj.id) {
		userObj = await prisma.user.create({
			data: userObj,
		})
	}

	Object.assign(data, {
		user: {
			connect: {
				id: userObj.id,
			},
		},
	})

	return prisma.ticket.update({
		where: { id },
		data,
		select: {
			id: true,
			status: true,
			user: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
					email: true,
					phone: true,
				},
			},
			seat: true,
		},
	})
}

export async function resetData() {
	await prisma.ticket.deleteMany({})
	await prisma.user.deleteMany({})
	await prisma.seat.deleteMany({})
}
