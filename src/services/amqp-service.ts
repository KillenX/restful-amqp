import { Channel, connect, Connection, Options } from "amqplib"

export class AmqpService {
    private allowClose = false

    private constructor(
        readonly queueUrl: string,
        readonly connection: Connection,
        protected pubChannel: Channel,
        protected subChannel: Channel
    ) {
        // Do this so checking or attempting to close
        // non-existing entities doesnt require an app restart
        // TODO: check if the error is fatal
        pubChannel.on("close", async (err: any) => {
            if (this.allowClose) return
            pubChannel = await this.connection.createChannel()
        })

        subChannel.on("close", async (err: any) => {
            if (this.allowClose) return
            subChannel = await this.connection.createChannel()
        })
    }

    static async create(queueUrl: string): Promise<AmqpService> {
        const conn = await connect(queueUrl)
        let pubChannel = await conn.createChannel()
        let subChannel = await conn.createChannel()

        return new AmqpService( queueUrl, conn, pubChannel, subChannel)
    }

    close(): Promise<void> {
        this.allowClose = true
        return this.connection.close()
    }

    publish(message: any, options: any, route: string) {
        throw new Error("Not implemented")
    }

    subscribe(routingKey: string, exchange: string) {
        throw new Error("Not implemented")
    }

    //#region Queue methods - a bit of boilerplate 
    assertQueue(queue: string, options?: Options.AssertQueue) {
        return this.pubChannel.assertQueue(queue, options)
    }

    bindQueue(queue: string, exchange: string, pattern: string) {
        return this.pubChannel.bindQueue(queue, exchange, pattern)
    }

    unbindQueue(queue: string, exchange: string, pattern: string) {
        return this.pubChannel.unbindQueue(queue, exchange, pattern)
    }

    purgeQueue(queue: string) {
        return this.pubChannel.purgeQueue(queue)
    }

    checkQueue(queue: string) {
        return this.pubChannel.checkQueue(queue)
    }
    //#endregion

}