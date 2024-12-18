import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createTripUseCase } from '../../use-cases/create-trip'
import { createTripValidation } from '../validations/create-trip-validation'

export const createTrip: FastifyPluginAsyncZod = async app => {
  app.post(
    '/trips',
    {
      schema: {
        body: createTripValidation,
      },
    },
    async (request, reply) => {
      const {
        destination,
        starts_at,
        ends_at,
        owner_name,
        owner_email,
        emails_to_invite,
      } = request.body

      const { trip } = await createTripUseCase({
        destination,
        starts_at,
        ends_at,
        owner_name,
        owner_email,
        emails_to_invite,
      })

      return reply.status(201).send({ trip_id: trip.id })
    },
  )
}
