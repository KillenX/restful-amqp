export const serverConfig = {
    host: process.env.HOST || "127.0.0.1",
    port: Number.parseInt(process.env.PORT || "3000", 10)
}