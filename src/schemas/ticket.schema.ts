import z, { object, string } from "zod"

const TICKET_STATUS = ["open", "close"] as const

export const getTicketsSchema = object({
	query: object({
		status: z.enum(TICKET_STATUS).optional(),
	}),
})

// Update ticket status | Book ticket
export const updateTicketSchema = object({
	body: object({
		status: z.enum(TICKET_STATUS)?.optional(),
		user: object({
			firstName: string().optional(),
			lastName: string().optional(),
			email: string().email().optional(),
			phone: z.string().optional(),
		}).optional(),
	}),
	params: object({
		id: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive().max(100)),
	}),
})

export const getTicketStatusSchema = object({
	params: object({
		id: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive().max(100)),
	}),
})
