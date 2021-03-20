import { Channel, connect, Connection } from "amqplib"

export class AmqpService {
    private constructor(
        readonly queueUrl: string,
        readonly connection: Connection,
        readonly pubChannel: Channel,
        readonly subChannel: Channel
    ) { }

    static async create(queueUrl: string): Promise<AmqpService> {
        const conn = await connect(queueUrl)
        const pubChannel = await conn.createChannel()
        const subChannel = await conn.createChannel()

        return new AmqpService(queueUrl, conn, pubChannel, subChannel)
    }

    publish(message: any, options: any, route: string) {
        throw new Error("Not implemented")
    }

    subscribe(routingKey: string, exchange: string) {
        throw new Error("Not implemented")
    }

    close(): Promise<void> {
        return this.connection.close()
    }
}