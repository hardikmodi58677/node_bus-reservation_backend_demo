import z, { AnyZodObject } from "zod"
import Express from "express"

export async function zParse<T extends AnyZodObject>(
	schema: T,
	req: Express.Request,
	res: Express.Response
): Promise<z.infer<T>> {
	try {
		return await schema.parseAsync(req)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({
				status: "error",
				message: error.issues.map((issue: any) => issue.message),
			})
		}
		throw error
	}
}
