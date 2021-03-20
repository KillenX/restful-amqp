import { FastifyInstance } from "fastify"

import queueRoutes from "./queue"
import exchangeRoutes from "./exchange"

export default async function (server: FastifyInstance) {
    server.register(queueRoutes)
    server.register(exchangeRoutes)
}