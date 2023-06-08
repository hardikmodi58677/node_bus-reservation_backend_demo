import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"
const prisma = new PrismaClient()

const seatSeedData = new Array(40).fill(null).map((_, index) => ({
	id: index + 1,
	seatNumber: faker.number.int({
		min: 1,
		max: 40,
	}),
}))

const userSeedData = new Array(15).fill(null).map((_, index) => ({
	id: index + 1,
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	email: faker.internet.email(),
	phone: faker.phone.number(),
}))

const ticketSeedData = new Array(20).fill(null).reduce((acc, cur, index) => {
	let user = userSeedData[faker.number.int({ min: 0, max: 39 })]
	let seat = seatSeedData[faker.number.int({ min: 0, max: 39 })]

	let obj = {}

	if (!user?.id || !seat?.id) {
		obj = {
			id: index + 1,
			status: "open",
		}
		acc.push(obj)
		return acc
	}

	obj = {
		id: index + 1,
		userId: user?.id,
		seatId: seat?.id,
		status: user && seat ? "closed" : "open",
	}

	acc.push(obj)
	return acc
}, [])

async function main() {
	await prisma.seat.createMany({
		data: seatSeedData,
		skipDuplicates: true,
	})

	await prisma.user.createMany({
		data: userSeedData,
		skipDuplicates: true,
	})

	await prisma.ticket.createMany({
		data: ticketSeedData,
		skipDuplicates: true,
	})
}

;(async () => {
	await main()
})()
