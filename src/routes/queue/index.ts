import { FastifyInstance } from "fastify"

import { BindBody, NameParam } from "./schema"
import { AmqpService } from "../../services/amqp-service"

export default function (as: AmqpService) {
    return async function (server: FastifyInstance) {

        server.get<{
            Params: NameParam
        }>('/:queue',
            {
                schema: {
                    params: NameParam
                }
            },
            (req, res) => {
                console.log("Checked the queue for existence")
                return as.checkQueue(req.params.queue)
            })

        server.post<{
            Params: NameParam
        }>('/:queue',
            {
                schema: {
                    params: NameParam
                }
            },
            (req, res) => {
                console.log(`Creating a new queue ${req.params.queue}`)
                return as.assertQueue(req.params.queue)
            })

        server.post<{
            Params: NameParam,
            Body: BindBody
        }>('/:queue/bind',
            {
                schema: {
                    params: NameParam,
                    body: BindBody
                }
            },
            async (req, res) => {
                console.log(`Binding a queue ${req.params.queue}`)
                // TODO: Assert exchange first
                return as.bindQueue(
                    req.params.queue,
                    req.body.exchange,
                    req.body.routingKey
                )
            })

        server.post<{
            Params: NameParam,
            Body: BindBody
        }>('/:queue/unbind',
            {
                schema: {
                    params: NameParam,
                    body: BindBody
                }
            },
            async (req, res) => {
                console.log(`unbinding a queue ${req.params.queue}`)
                // TODO: Assert exchange first
                return as.bindQueue(
                    req.params.queue,
                    req.body.exchange,
                    req.body.routingKey
                )
            })

        server.delete<{
            Params: NameParam
        }>('/:queue',
            {
                schema: {
                    params: NameParam
                }
            },
            async (req, res) => {
                console.log("Purged the queue")
                return as.purgeQueue(req.params.queue)
            })
    }
}
