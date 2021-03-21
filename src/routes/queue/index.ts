import * as fastify from 'fastify'

import  {
    FastifyReply,
    FastifyRequest,
    FastifyInstance,
} from "fastify"
import { AmqpService } from "../../services/amqp-service"
import { NameParam } from "./schema"

export default function (as: AmqpService) {
    return async function (server: FastifyInstance) {

        server.get<any, NameParam, unknown>(
            '/:queue',{
                schema:{
                    
                }
            },
            async (req: FastifyRequest, res: FastifyReply) => {
                console.log("Checked the queue for existence")
                return as.checkQueue((req.params as any).queue)
            })

        server.post('/:queue', async (req: FastifyRequest, res: FastifyReply) => {
            console.log(`Creating a new queue ${(req.params as any).queue}`)
            return as.assertQueue((req.params as any).queue)
        })

        server.post('/:queue/bind', async (req: FastifyRequest, res: FastifyReply) => {
            console.log(`Binding a queue ${(req.params as any).queue}`)
            // TODO: Assert exchange first
            return as.bindQueue(
                (req.params as any).query,
                (req.body as any).exchange,
                (req.body as any).routingKey
            )
        })

        server.post('/:queue/unbind', async (req: FastifyRequest, res: FastifyReply) => {
            console.log(`unbinding a queue ${(req.params as any).queue}`)
            // TODO: Assert exchange first
            return as.bindQueue(
                (req.params as any).query,
                (req.body as any).exchange,
                (req.body as any).routingKey
            )
        })

        server.delete('/:queue', async (req: FastifyRequest, res: FastifyReply) => {
            console.log("Purged the queue")
            return as.purgeQueue((req.params as any).queue)
        })
    }
}
