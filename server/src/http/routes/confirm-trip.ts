import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { confirmTripValidation } from '../validations/confirm-trip-validation'

export const confirmTrip: FastifyPluginAsyncZod = async app => {
  app.get(
    '/trips/:trip_id/confirm',
    {
      schema: {
        params: confirmTripValidation,
      },
    },
    async (request, reply) => {
      const { trip_id } = request.params

      return reply.status(201).send({ tripId: trip_id })
    },
  )
}
