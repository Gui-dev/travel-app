import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getTripDetailsUseCase } from '../../use-cases/get-trip-details'
import { getTripDetailsParamsValidation } from '../validations/get-trip-details-validation'

export const getTripDetails: FastifyPluginAsyncZod = async app => {
  app.get(
    '/trips/:trip_id',
    {
      schema: {
        params: getTripDetailsParamsValidation,
      },
    },
    async (request, reply) => {
      const { trip_id } = request.params

      const trip = await getTripDetailsUseCase({ trip_id })

      return reply.status(201).send(trip)
    },
  )
}
