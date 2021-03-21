import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { AmqpService } from "../../services/amqp-service"

export default function (as: AmqpService) {
    return async function (server: FastifyInstance) {

        server.get('/:queue/check', async (req: FastifyRequest, res: FastifyReply) => {
            console.log("Did this")
            return as.checkQueue((req.params as any).queue)
        })

        server.post('/:queue', async (req: FastifyRequest, res: FastifyReply) => {
            console.log(`Creating a new queue ${(req.params as any).queue}`)
            return as.assertQueue((req.params as any).queue)
        })
    }
}