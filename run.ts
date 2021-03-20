require("dotenv").config()
import { fastify } from "fastify"

import routes from "./src/routes"
import { swaggerConfig } from "./src/config/swagger"

const server = fastify()

// Register swagger before other routes so they're shown
server.register(require("fastify-swagger"), swaggerConfig)
server.register(require("fastify-healthcheck"))
server.register(routes)

server.listen(3000, '127.0.0.1')