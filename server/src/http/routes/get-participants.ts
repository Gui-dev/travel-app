import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getParticipantsUseCase } from '../../use-cases/get-participants'
import { getParticipantsParamsValidation } from '../validations/get-participants-validation'

export const getParticipants: FastifyPluginAsyncZod = async app => {
  app.get(
    '/trips/:trip_id/participants',
    {
      schema: {
        params: getParticipantsParamsValidation,
      },
    },
    async (request, reply) => {
      const { trip_id } = request.params

      const participants = await getParticipantsUseCase({ trip_id })

      return reply.status(201).send(participants)
    },
  )
}
