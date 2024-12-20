import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { confirmTripUseCase } from '../../use-cases/confirm-trip'
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
      const trip = await confirmTripUseCase({ trip_id })

      return reply.redirect(`http://localhost:3000/trips/${trip.id}`)
    },
  )
}
