import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getParticipantUseCase } from '../../use-cases/get-participant'
import { getParticipantParamsValidation } from '../validations/get-participant-validation'

export const getParticipant: FastifyPluginAsyncZod = async app => {
  app.get(
    '/participants/:participant_id',
    {
      schema: {
        params: getParticipantParamsValidation,
      },
    },
    async (request, reply) => {
      const { participant_id } = request.params

      const participant = await getParticipantUseCase({ participant_id })

      return reply.status(201).send(participant)
    },
  )
}
