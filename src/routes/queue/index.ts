import { FastifyInstance } from "fastify"

import { BindBody, NameParam } from "./schema"
import { AmqpService } from "../../services/amqp-service"

export default function (as: AmqpService) {
    return async function (server: FastifyInstance) {

        server.get<{
            Params: NameParam
        }>('/:queue', async (req, res) => {
            console.log("Checked the queue for existence")
            req.query
            return as.checkQueue(req.params.queue)
        })

        server.post<{
            Params: NameParam
        }>('/:queue', async (req, res) => {
            console.log(`Creating a new queue ${req.params.queue}`)
            return as.assertQueue(req.params.queue)
        })

        server.post<{
            Params: NameParam,
            Body: BindBody
        }>('/:queue/bind', async (req, res) => {
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
        }>('/:queue/unbind', async (req, res) => {
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
        }>('/:queue', async (req, res) => {
            console.log("Purged the queue")
            return as.purgeQueue(req.params.queue)
        })
    }
}
