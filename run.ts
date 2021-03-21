require("dotenv").config()
import { fastify } from "fastify"

import routes from "./src/routes"
import { serverConfig } from "./src/config/server"
import { swaggerConfig } from "./src/config/swagger"
import { AmqpService } from "./src/services/amqp-service"

const server = fastify()

async function main() {
    const amqpService = await AmqpService.create(process.env.QUEUE_URL || "amqp://localhost")

    // Register swagger before other routes so they're shown
    server.register(require("fastify-swagger"), swaggerConfig)
    server.register(require("fastify-healthcheck"))
    server.register(routes(amqpService), { prefix: "api" })

    server.listen(serverConfig.port, serverConfig.host)
        .then((address: string) => console.log(`Server running at ${address}`))
}

main().catch(console.log)