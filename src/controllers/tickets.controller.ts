import { NextFunction, Request, Response } from "express"
import { zParse } from "../utils/zod"
import { findTicketById, findTickets, resetData, updateTicket } from "../services/ticket.service"
import { getTicketStatusSchema, getTicketsSchema, updateTicketSchema } from "../schemas/ticket.schema"

export async function getTicketsHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const { query } = await zParse(getTicketsSchema, req, res)
		const tickets = await findTickets({ where: query })
		return res.status(200).json({
			status: "success",
			data: tickets,
			message: "Tickets retrieved successfully",
		})
	} catch (error) {
		return next(error)
	}
}

export async function updateTicketHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const { body, params } = await zParse(updateTicketSchema, req, res)

		const ticket = await findTicketById(params.id)

		if (!ticket) {
			return res.status(404).json({
				status: "error",
				message: "Ticket not found",
			})
		}

		const updatedTicket = await updateTicket(params.id, {
			...ticket,
			status: body.status,
			user: {
				...ticket.user,
				...body.user,
			},
		})

		return res.status(200).json({
			status: "success",
			data: updatedTicket,
			message: "Ticket updated successfully",
		})
	} catch (error) {
		return next(error)
	}
}

export async function getTicketHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const { params } = await zParse(getTicketStatusSchema, req, res)

		const ticket = await findTicketById(params.id)

		if (!ticket) {
			return res.status(404).json({
				status: "error",
				message: "Ticket not found",
			})
		}

		return res.status(200).json({
			status: "success",
			data: ticket,
			message: "Ticket retrieved successfully",
		})
	} catch (error) {
		next(error)
	}
}

export async function resetTicketsHandler(req: Request, res: Response, next: NextFunction) {
	try {
		await resetData()

		return res.status(200).json({
			status: "success",
			message: "Data reset successfully",
		})
	} catch (error) {
		return next(error)
	}
}
