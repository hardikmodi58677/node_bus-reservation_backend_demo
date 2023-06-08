import z, { object } from "zod"

export const getUserSchema = object({
	params: object({
		id: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive().max(100)),
	}),
})
