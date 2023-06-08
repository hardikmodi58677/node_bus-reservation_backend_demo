require("dotenv").config()
import "./utils/prisma"
import express, { NextFunction, Request, Response } from "express"
import config from "config"
import morgan from "morgan"
import cors from "cors"
import AppError from "./utils/appError"
import ticketsRouter from "./routes/ticket.routes"
import usersRouter from "./routes/user.routes"
import validateEnv from "./utils/validateEnv"

try {
	// Validate env variables
	validateEnv()

	const app = express()

	// Middlewares

	// 1. Body parser
	app.use(express.json({ limit: "10kb" }))

	// 2. Logger
	if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

	// 3. Cors
	app.use(
		cors({
			origin: config.get<string>("origin") || "*",
		})
	)

	// Routes
	app.use("/api/v1/tickets/", ticketsRouter)
	app.use("/api/v1/users/", usersRouter)

	app.get("/api/health", (_, res: Response) => {
		return res.status(200).json({
			status: "success",
			message: "Bus Ticketing API",
		})
	})

	// Catch all unhandled routes
	app.all("*", (req: Request, res: Response, next: NextFunction) => {
		next(new AppError(404, `Can't find ${req.originalUrl} on this server`))
	})

	// Error handler
	app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
		error.status = error.status || "error"
		error.statusCode = error.statusCode || 500

		res.status(error.statusCode).json({
			status: error.status,
			message: error.message,
		})
	})

	const port = config.get<number>("port")
	app.listen(port)
	console.log(`Server started with pid: ${process.pid} on port: ${port}`)
} catch (error) {
	console.error(error)
	process.exit(1)
}
