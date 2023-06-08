import express from "express"
import {
	getTicketHandler,
	getTicketsHandler,
	resetTicketsHandler,
	updateTicketHandler,
} from "../controllers/tickets.controller"

const router = express.Router()

// Get all closed tickets
router.route("").get(getTicketsHandler)

router.route("/:id").get(getTicketHandler)
router.route("/:id").put(updateTicketHandler)

router.route("/reset").post(resetTicketsHandler)

export default router
