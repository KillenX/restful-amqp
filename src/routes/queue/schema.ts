import { Static, Type } from "@sinclair/typebox"

export const NameParam = Type.Object({
  queue: Type.String()
})
export type NameParam = Static<typeof NameParam>

export const BindBody = Type.Object({
  exchange: Type.String(),
  routingKey: Type.String()
})
export type BindBody = Static<typeof BindBody>