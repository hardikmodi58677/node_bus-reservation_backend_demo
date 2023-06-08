import { NextFunction, Request, Response } from "express"
import { zParse } from "../utils/zod"
import { getUserSchema } from "../schemas/user.schema"
import { getUserById } from "../services/user.service"

export async function getUserHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const { params } = await zParse(getUserSchema, req, res)

		const user = await getUserById(params.id)

		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "User not found",
			})
		}

		return res.status(200).json({
			status: "success",
			data: user,
			message: "User retrieved successfully",
		})
	} catch (error) {
		next(error)
	}
}
