import { FastifyInstance } from "fastify"

import queueRoutes from "./queue"
import exchangeRoutes from "./exchange"
import { AmqpService } from "../services/amqp-service"

export default function (as: AmqpService) {
    return async function (server: FastifyInstance) {
        server.register(queueRoutes(as), { prefix: "queue" })
        server.register(exchangeRoutes(as), { prefix: "exchange" })
    }
}