import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { updateTripUseCase } from '../../use-cases/update-trip'
import {
  updateTripBodyValidation,
  updateTripParamsValidation,
} from '../validations/update-trip-validation'

export const updateTrip: FastifyPluginAsyncZod = async app => {
  app.put(
    '/trips/:trip_id',
    {
      schema: {
        params: updateTripParamsValidation,
        body: updateTripBodyValidation,
      },
    },
    async (request, reply) => {
      const { trip_id } = request.params
      const { destination, starts_at, ends_at } = request.body

      const { trip } = await updateTripUseCase({
        trip_id,
        destination,
        starts_at,
        ends_at,
      })

      return reply.status(201).send({ trip_id: trip.id })
    },
  )
}
